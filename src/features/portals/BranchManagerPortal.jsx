import { useState } from 'react'

const branchNavigation = [
  { group: 'Overview', items: ['Dashboard', 'Notifications & Alerts'] },
  { group: 'People', items: ['Member Management', 'Trainer Management', 'Staff Management'] },
  { group: 'Operations', items: ['Membership Management', 'Class Management', 'Personal Training Management', 'Attendance Management'] },
  { group: 'Finance & Growth', items: ['Payment Management', 'Leads / CRM', 'Expense Management', 'Renewal Management'] },
  { group: 'Insights', items: ['Reports & Analytics'] },
  { group: 'Administration', items: ['Branch Settings', 'Profile & Security'] },
]

function BranchManagerPortal() {
  const [activeSection, setActiveSection] = useState('Dashboard')
  return (
    <div className="member-portal branch-portal">
      <aside className="member-sidebar">
        <div className="member-profile">
          <span className="member-avatar branch-avatar">RM</span>
          <div><strong>Riley Morgan</strong><span>Branch manager</span></div>
        </div>
        <p className="member-menu-label">Downtown branch</p>
        <nav className="member-nav branch-nav" aria-label="Branch manager portal navigation">
          {branchNavigation.map((group) => (
            <div className="branch-nav-group" key={group.group}>
              <span className="branch-nav-label">{group.group}</span>
              {group.items.map((item) => (
                <button className={item === activeSection ? 'active' : ''} key={item} type="button" onClick={() => setActiveSection(item)}>
                  <span className="member-nav-mark" aria-hidden="true" />{item}
                </button>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      <div className="member-content">
        <div className="member-heading">
          <div><p className="eyebrow">FitFlow branch manager portal</p><h1>{activeSection === 'Dashboard' ? 'Good morning, Riley.' : activeSection}</h1></div>
          <button className="notification-button" type="button" aria-label="View alerts">4</button>
        </div>

        {activeSection === 'Dashboard' ? (
          <>
            <section className="member-welcome branch-welcome"><div><span className="member-kicker">Tuesday, September 5 · Downtown branch</span><h2>Your branch is moving well.</h2><p>Here&apos;s the operational picture for today.</p></div><button type="button" className="member-primary-button" onClick={() => setActiveSection('Reports & Analytics')}>View reports <span aria-hidden="true">-&gt;</span></button></section>
            <div className="member-stat-grid branch-stat-grid"><article><span>Active members</span><strong>1,248 <small>members</small></strong><em>+4.8% this month</em></article><article><span>Today&apos;s attendance</span><strong>186 <small>visits</small></strong><em>72 checked in now</em></article><article><span>Monthly revenue</span><strong>$42.8k</strong><em>+8.2% vs last month</em></article><article><span>Open leads</span><strong>38 <small>leads</small></strong><em>12 follow-ups today</em></article></div>
            <div className="branch-alert-row"><div className="branch-alert"><span className="alert-mark">!</span><div><strong>7 memberships expire this week</strong><span>Review renewals before Friday</span></div><button type="button" onClick={() => setActiveSection('Renewal Management')}>Review</button></div><div className="branch-alert payment-alert"><span className="alert-mark">$</span><div><strong>12 pending payments</strong><span>Outstanding branch balance</span></div><button type="button" onClick={() => setActiveSection('Payment Management')}>View</button></div></div>
            <div className="member-dashboard-grid branch-dashboard-grid"><section className="member-card workout-card"><div className="member-card-heading"><h3>Today at a glance</h3><button type="button" onClick={() => setActiveSection('Attendance Management')}>Attendance</button></div><div className="workout-row"><span className="workout-icon branch-icon">08:00</span><div><strong>Morning rush</strong><span>46 check-ins · 3 classes</span></div><span className="workout-status">Complete</span></div><div className="workout-row"><span className="workout-icon branch-icon">12:30</span><div><strong>Peak hours</strong><span>58 check-ins · 4 classes</span></div><span className="workout-status">Active</span></div><div className="workout-row"><span className="workout-icon branch-icon">18:00</span><div><strong>Evening rush</strong><span>82 expected · 6 classes</span></div><span className="workout-status muted">Upcoming</span></div></section><section className="member-card membership-card"><div className="member-card-heading"><h3>Branch pulse</h3><button type="button" onClick={() => setActiveSection('Reports & Analytics')}>Details</button></div><div className="branch-pulse"><span>Capacity today</span><strong>68%</strong><div className="trainer-progress-bar"><span /></div><span>Trainer coverage</span><strong>94%</strong><div className="trainer-progress-bar green"><span /></div></div></section></div>
          </>
        ) : (
          <section className="member-empty-state"><span className="member-empty-mark">{activeSection.slice(0, 2).toUpperCase()}</span><h2>{activeSection}</h2><p>Your {activeSection.toLowerCase()} workspace will appear here. This area is ready for the next FitFlow branch feature.</p><button type="button" className="member-primary-button" onClick={() => setActiveSection('Dashboard')}>Back to dashboard <span aria-hidden="true">-&gt;</span></button></section>
        )}
      </div>
    </div>
  )
}

export default BranchManagerPortal
