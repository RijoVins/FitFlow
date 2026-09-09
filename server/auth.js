import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const sessionCookie = 'fitflow_session'

function getJwtSecret() {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is required')
  }
  return process.env.JWT_SECRET
}

export async function hashPassword(password) {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password, passwordHash) {
  return bcrypt.compare(password, passwordHash)
}

export function createToken(user) {
  return jwt.sign(
    { sub: user.id, role: user.role, email: user.email },
    getJwtSecret(),
    { expiresIn: '7d' },
  )
}

export function setSessionCookie(response, token) {
  response.cookie(sessionCookie, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
}

export function clearSessionCookie(response) {
  response.clearCookie(sessionCookie, { httpOnly: true, sameSite: 'lax' })
}

export function requireAuth(request, response, next) {
  const token = request.cookies[sessionCookie]

  if (!token) {
    return response.status(401).json({ error: 'Authentication required' })
  }

  try {
    request.user = jwt.verify(token, getJwtSecret())
    return next()
  } catch {
    return response.status(401).json({ error: 'Session expired or invalid' })
  }
}
