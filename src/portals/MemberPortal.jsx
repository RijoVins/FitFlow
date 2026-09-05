import { useState } from 'react'

const memberNavigation = [
  'Dashboard',
  'My Membership',
  'My Workouts',
  'Classes',
  'Personal Training',
  'Progress',
  'Attendance',
  'Payments',
  'Notifications',
  'Profile & Settings',
]

function MemberPortal() {
  const [activeSection, setActiveSection] = useState('Dashboard')

  return (
    <div className="member-portal">
      <aside className="member-sidebar">
        <div className="member-profile">
          <span className="member-avatar">JD</span>
          <div><strong>Jordan Davis</strong><span>Member</span></div>
        </div>
        <p className="member-menu-label">My workspace</p>
        <nav className="member-nav" aria-label="Member portal navigation">
          {memberNavigation.map((item) => (
            <button className={item === activeSection ? 'active' : ''} key={item} type="button" onClick={() => setActiveSection(item)}>
              <span className="member-nav-mark" aria-hidden="true" />{item}
            </button>
          ))}
        </nav>
      </aside>

      <div className="member-content">
        <div className="member-heading">
          <div><p className="eyebrow">FitFlow member portal</p><h1>{activeSection === 'Dashboard' ? 'Good morning, Jordan.' : activeSection}</h1></div>
          <button className="notification-button" type="button" aria-label="View notifications">2</button>
        </div>

        {activeSection === 'Dashboard' ? (
          <>
            <section className="member-welcome"><div><span className="member-kicker">Tuesday, September 5</span><h2>Ready for your next session?</h2><p>Your consistency is building something strong.</p></div><button type="button" className="member-primary-button" onClick={() => setActiveSection('My Workouts')}>View workout <span aria-hidden="true">-&gt;</span></button></section>
            <div className="member-stat-grid"><article><span>Current streak</span><strong>12 <small>days</small></strong><em>+3 from last week</em></article><article><span>This month</span><strong>8 <small>sessions</small></strong><em>Great work so far</em></article><article><span>Next class</span><strong>06:30 <small>PM</small></strong><em>Strength & conditioning</em></article></div>
            <div className="member-dashboard-grid"><section className="member-card workout-card"><div className="member-card-heading"><h3>Today&apos;s workout</h3><button type="button" onClick={() => setActiveSection('My Workouts')}>See all</button></div><div className="workout-row"><span className="workout-icon">01</span><div><strong>Upper body strength</strong><span>5 exercises · 45 min</span></div><span className="workout-status">Ready</span></div><div className="workout-row"><span className="workout-icon">02</span><div><strong>Mobility finisher</strong><span>3 exercises · 10 min</span></div><span className="workout-status muted">Later</span></div></section><section className="member-card membership-card"><div className="member-card-heading"><h3>My membership</h3><button type="button" onClick={() => setActiveSection('My Membership')}>Manage</button></div><p className="membership-name">FitFlow Unlimited</p><span className="membership-pill">Active</span><div className="membership-details"><span>Next billing</span><strong>October 05, 2026</strong><span>Home club</span><strong>FitFlow Downtown</strong></div></section></div>
          </>
        ) : (
          <section className="member-empty-state"><span className="member-empty-mark">{activeSection.slice(0, 2).toUpperCase()}</span><h2>{activeSection}</h2><p>Your {activeSection.toLowerCase()} details will appear here. This space is ready for the next FitFlow feature.</p><button type="button" className="member-primary-button" onClick={() => setActiveSection('Dashboard')}>Back to dashboard <span aria-hidden="true">-&gt;</span></button></section>
        )}
      </div>
    </div>
  )
}

export default MemberPortal
