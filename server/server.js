import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import express from 'express'
import { clearSessionCookie, createToken, hashPassword, requireAuth, setSessionCookie, verifyPassword } from './auth.js'
import { pool, query } from './db.js'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const port = Number(process.env.PORT || 4000)
const allowedRoles = new Set(['member', 'trainer', 'branch', 'company', 'super'])

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173', credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.get('/api/health', async (_request, response) => {
  try {
    await query('SELECT 1')
    return response.json({ status: 'ok', database: 'connected' })
  } catch {
    return response.status(503).json({ status: 'error', database: 'unavailable' })
  }
})

app.post('/api/auth/register', async (request, response) => {
  const { email, password, role = 'member' } = request.body
  const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : ''

  if (!normalizedEmail || typeof password !== 'string' || password.length < 8) {
    return response.status(400).json({ error: 'A valid email and password of at least 8 characters are required' })
  }

  if (!allowedRoles.has(role)) {
    return response.status(400).json({ error: 'Invalid role' })
  }

  try {
    const passwordHash = await hashPassword(password)
    const result = await query(
      'INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING id, email, role',
      [normalizedEmail, passwordHash, role],
    )
    const user = result.rows[0]
    setSessionCookie(response, createToken(user))
    return response.status(201).json({ user })
  } catch (error) {
    if (error.code === '23505') {
      return response.status(409).json({ error: 'An account with that email already exists' })
    }
    return response.status(500).json({ error: 'Unable to create account' })
  }
})

app.post('/api/auth/login', async (request, response) => {
  const { email, password } = request.body
  const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : ''

  if (!normalizedEmail || typeof password !== 'string') {
    return response.status(400).json({ error: 'Email and password are required' })
  }

  try {
    const result = await query(
      'SELECT id, email, password_hash, role FROM users WHERE LOWER(email) = $1',
      [normalizedEmail],
    )
    const user = result.rows[0]

    if (!user) {
      return response.status(401).json({ error: 'No account found with that email. Create an account to get started.' })
    }

    if (!(await verifyPassword(password, user.password_hash))) {
      return response.status(401).json({ error: 'Incorrect password. Please try again.' })
    }

    setSessionCookie(response, createToken(user))
    return response.json({ user: { id: user.id, email: user.email, role: user.role } })
  } catch {
    return response.status(500).json({ error: 'Unable to sign in' })
  }
})

app.get('/api/auth/me', requireAuth, async (request, response) => {
  const result = await query('SELECT id, email, role FROM users WHERE id = $1', [request.user.sub])
  const user = result.rows[0]

  if (!user) {
    clearSessionCookie(response)
    return response.status(401).json({ error: 'User account no longer exists' })
  }

  return response.json({ user })
})

app.post('/api/auth/logout', (_request, response) => {
  clearSessionCookie(response)
  return response.status(204).end()
})

async function start() {
  const schema = await fs.readFile(path.join(__dirname, 'schema.sql'), 'utf8')
  await query('CREATE EXTENSION IF NOT EXISTS pgcrypto')
  await query(schema)
  app.listen(port, () => {
    console.log(`FitFlow API listening on http://localhost:${port}`)
  })
}

start().catch(async (error) => {
  console.error('Unable to start FitFlow API:', error.message)
  await pool.end()
  process.exit(1)
})