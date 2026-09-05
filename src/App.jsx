import { useEffect, useState } from 'react'
import './App.css'
import MemberPortal from './portals/MemberPortal'
import TrainerPortal from './portals/TrainerPortal'
import BranchManagerPortal from './portals/BranchManagerPortal'
import CompanyAdminPortal from './portals/CompanyAdminPortal'
import SuperAdminPortal from './portals/SuperAdminPortal'
import gymHero from './assets/gym-hero.jpg'
import gymInterior from './assets/gym-interior.jpg'
import gymTraining from './assets/gym-training.jpg'

const portalViews = {
  member: MemberPortal,
  trainer: TrainerPortal,
  branch: BranchManagerPortal,
  company: CompanyAdminPortal,
  super: SuperAdminPortal,
}

const heroSlides = [
  {
    image: gymHero,
    alt: 'Athlete training inside a modern gym',
    eyebrow: 'The rhythm of a better studio',
    title: <>Make space<br />for stronger days.</>,
    description: 'FitFlow gives your gym the clarity to help people move, train, and keep coming back.',
  },
  {
    image: gymInterior,
    alt: 'Bright gym interior with workout equipment',
    eyebrow: 'A room full of momentum',
    title: <>Bring your<br />people together.</>,
    description: 'Keep your members, trainers, and teams moving in the same direction.',
  },
  {
    image: gymTraining,
    alt: 'Person lifting weights in a fitness studio',
    eyebrow: 'Progress looks different here',
    title: <>Built for<br />the next rep.</>,
    description: 'The simple operating rhythm your studio needs to make progress feel natural.',
  },
]

function App() {
  const [activePortal, setActivePortal] = useState(null)
  const [showLogin, setShowLogin] = useState(false)
  const [activeHero, setActiveHero] = useState(0)
  const [role, setRole] = useState('member')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const ActivePortal = activePortal ? portalViews[activePortal] : null
  const heroSlide = heroSlides[activeHero]

  useEffect(() => {
    if (showLogin || activePortal) return undefined

    const interval = setInterval(() => {
      setActiveHero((current) => (current + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [showLogin, activePortal])

  function handleLogin(event) {
    event.preventDefault()
    setActivePortal(role)
  }

  function handleLogout() {
    setActivePortal(null)
    setShowLogin(false)
    setPassword('')
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <button className="brand" type="button" onClick={handleLogout}>
          <span className="brand-mark">F</span>
          <span>FitFlow</span>
        </button>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#gyms">Explore gyms</a>
          <a href="#contact">Contact</a>
          <button className="nav-login" type="button" onClick={() => setShowLogin(true)}>Login</button>
        </nav>
      </header>

      {ActivePortal ? (
        <section className="portal-view">
          <button className="back-button" type="button" onClick={handleLogout}>
            <span aria-hidden="true">&lt;-</span> Sign out
          </button>
          <ActivePortal />
        </section>
      ) : showLogin ? (
        <section className="login-page">
          <div className="login-visual">
            <img
              src={gymHero}
              alt="Athlete training inside a modern gym"
            />
            <div className="visual-shade" />
            <div className="visual-copy">
              <p className="eyebrow">Move with purpose</p>
              <h1>Built for the<br />work behind<br />the results.</h1>
              <p>One calm place for every part of your fitness studio.</p>
            </div>
            <span className="visual-caption">FitFlow / 2026</span>
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            <div className="mobile-intro">
              <p className="eyebrow">Welcome to FitFlow</p>
              <p>Sign in to your workspace.</p>
            </div>
            <div className="form-heading">
              <span>Sign in</span>
              <span className="form-step">01 / 01</span>
            </div>
            <label htmlFor="email">Email address</label>
            <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@fitflow.com" required />
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" required />
            <label htmlFor="role">Sign in as</label>
            <select id="role" value={role} onChange={(event) => setRole(event.target.value)}>
              <option value="member">Member</option>
              <option value="trainer">Trainer</option>
              <option value="branch">Branch manager</option>
              <option value="company">Company admin</option>
            </select>
            <button className="login-button" type="submit">Continue <span aria-hidden="true">-&gt;</span></button>
            <button className="login-cancel" type="button" onClick={() => setShowLogin(false)}>Back to FitFlow</button>
          </form>
        </section>
      ) : (
        <>
          <section className="hero-section">
            <img key={heroSlide.image} src={heroSlide.image} alt={heroSlide.alt} />
            <div className="hero-shade" />
            <div className="hero-content">
              <p className="eyebrow">{heroSlide.eyebrow}</p>
              <h1>{heroSlide.title}</h1>
              <p>{heroSlide.description}</p>
              <button className="hero-button" type="button" onClick={() => setShowLogin(true)}>Enter FitFlow <span aria-hidden="true">-&gt;</span></button>
            </div>
            <span className="hero-label">FITFLOW / STUDIO MANAGEMENT</span>
            <div className="hero-dots" aria-label="Hero slides">
              {heroSlides.map((slide, index) => (
                <button className={index === activeHero ? 'active' : ''} key={slide.image} type="button" aria-label={`Show slide ${index + 1}`} onClick={() => setActiveHero(index)} />
              ))}
            </div>
          </section>

          <section className="intro-band">
            <p className="eyebrow">Made for the whole room</p>
            <h2>One flow for every<br />kind of progress.</h2>
            <p>From the front desk to the training floor, FitFlow keeps the people and work that make your studio special moving together.</p>
          </section>

          <section className="feature-strip" id="gyms">
            <article className="feature-image feature-image-large"><img src={gymInterior} alt="Bright gym interior with workout equipment" /></article>
            <article className="feature-copy"><p className="eyebrow">Find your flow</p><h2>Good spaces<br />make good habits.</h2><p>Discover studios built around the way you want to train. Your next session is closer than you think.</p><a href="#contact">Find a nearby gym <span aria-hidden="true">-&gt;</span></a></article>
            <article className="feature-image"><img src={gymTraining} alt="Person lifting weights in a fitness studio" /></article>
          </section>

          <section className="contact-section" id="contact">
            <div><p className="eyebrow">Start a conversation</p><h2>Let’s make your<br />studio flow.</h2></div>
            <form className="contact-form" onSubmit={(event) => event.preventDefault()}><input type="text" placeholder="Your name" aria-label="Your name" required /><input type="email" placeholder="Your email" aria-label="Your email" required /><textarea placeholder="How can we help?" aria-label="How can we help?" rows="3" required /><button className="hero-button" type="submit">Get in touch <span aria-hidden="true">-&gt;</span></button></form>
          </section>
        </>
      )}

      <footer className="footer">FitFlow <span>·</span> One clear place to run your studio</footer>
    </main>
  )
}

export default App
