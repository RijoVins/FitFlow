import { useState } from 'react'

const trainerNavigation = [
  'Dashboard',
  'My Clients',
  'Workout Plans',
  'Schedule',
  'Personal Training',
  'Classes',
  'Client Progress',
  'Attendance',
  'Messages',
  'Notifications',
  'My Profile',
]

function TrainerPortal() {
  const [activeSection, setActiveSection] = useState('Dashboard')

  return (
    <div className="member-portal trainer-portal">
      <aside className="member-sidebar">
        <div className="member-profile">
          <span className="member-avatar trainer-avatar">AM</span>
          <div><strong>Alex Morgan</strong><span>Head trainer</span></div>
        </div>
        <p className="member-menu-label">Trainer workspace</p>
        <nav className="member-nav" aria-label="Trainer portal navigation">
          {trainerNavigation.map((item) => (
            <button className={item === activeSection ? 'active' : ''} key={item} type="button" onClick={() => setActiveSection(item)}>
              <span className="member-nav-mark" aria-hidden="true" />{item}
            </button>
          ))}
        </nav>
      </aside>

      <div className="member-content">
        <div className="member-heading">
          <div><p className="eyebrow">FitFlow trainer portal</p><h1>{activeSection === 'Dashboard' ? 'Good morning, Alex.' : activeSection}</h1></div>
          <button className="notification-button" type="button" aria-label="View notifications">3</button>
        </div>

        {activeSection === 'Dashboard' ? (
          <>
            <section className="member-welcome trainer-welcome"><div><span className="member-kicker">Tuesday, September 5</span><h2>Your clients are counting on you.</h2><p>You have a focused day ahead. Here&apos;s what is moving.</p></div><button type="button" className="member-primary-button" onClick={() => setActiveSection('Schedule')}>Open schedule <span aria-hidden="true">-&gt;</span></button></section>
            <div className="member-stat-grid"><article><span>Active clients</span><strong>24 <small>people</small></strong><em>2 new this month</em></article><article><span>Today&apos;s sessions</span><strong>06 <small>sessions</small></strong><em>First at 07:30 AM</em></article><article><span>Client check-ins</span><strong>89<small>%</small></strong><em>+6% from last month</em></article></div>
            <div className="member-dashboard-grid"><section className="member-card workout-card"><div className="member-card-heading"><h3>Today&apos;s schedule</h3><button type="button" onClick={() => setActiveSection('Schedule')}>See full day</button></div><div className="workout-row"><span className="workout-icon trainer-icon">07:30</span><div><strong>Strength foundations</strong><span>4 clients · Studio A</span></div><span className="workout-status">Next</span></div><div className="workout-row"><span className="workout-icon trainer-icon">10:00</span><div><strong>Personal training</strong><span>Jordan Davis · Studio B</span></div><span className="workout-status muted">Later</span></div><div className="workout-row"><span className="workout-icon trainer-icon">18:30</span><div><strong>Evening conditioning</strong><span>12 clients · Main floor</span></div><span className="workout-status muted">Later</span></div></section><section className="member-card membership-card"><div className="member-card-heading"><h3>Client progress</h3><button type="button" onClick={() => setActiveSection('Client Progress')}>View all</button></div><p className="membership-name">Weekly check-in rate</p><span className="trainer-progress-value">89%</span><div className="trainer-progress-bar"><span /></div><div className="membership-details"><span>Needs attention</span><strong>3 client check-ins</strong><span>Plans to review</span><strong>5 workout plans</strong></div></section></div>
          </>
        ) : (
          <section className="member-empty-state"><span className="member-empty-mark">{activeSection.slice(0, 2).toUpperCase()}</span><h2>{activeSection}</h2><p>Your {activeSection.toLowerCase()} workspace will appear here. This area is ready for the next FitFlow trainer feature.</p><button type="button" className="member-primary-button" onClick={() => setActiveSection('Dashboard')}>Back to dashboard <span aria-hidden="true">-&gt;</span></button></section>
        )}
      </div>
    </div>
  )
}

export default TrainerPortal
