import { useState } from 'react'

const companyNavigation = [
  { group: 'Overview', items: ['Dashboard', 'Branch Comparison'] },
  { group: 'Organization', items: ['Branch Management', 'Member Management', 'Trainer Management', 'Branch Manager Management', 'Staff Management'] },
  { group: 'Membership', items: ['Membership Plan Management', 'Membership Management', 'Renewal Management'] },
  { group: 'Studio Operations', items: ['Class Management', 'Personal Training Management', 'Attendance Management'] },
  { group: 'Finance & Growth', items: ['Payment Management', 'Revenue Management', 'Expense Management', 'Leads / CRM'] },
  { group: 'Insights', items: ['Reports & Analytics'] },
  { group: 'Governance', items: ['Roles & Permissions', 'User Management', 'Notifications & Announcements', 'Audit Logs'] },
  { group: 'Company', items: ['Company Profile', 'Company Settings', 'Branch Access Control', 'Integrations', 'Data Export', 'Profile & Security'] },
]

function CompanyAdminPortal() {
  const [activeSection, setActiveSection] = useState('Dashboard')

  return (
    <div className="member-portal company-portal">
      <aside className="member-sidebar">
        <div className="member-profile"><span className="member-avatar company-avatar">FC</span><div><strong>FitCore Group</strong><span>Company admin</span></div></div>
        <p className="member-menu-label">Company workspace</p>
        <nav className="member-nav company-nav" aria-label="Company admin portal navigation">
          {companyNavigation.map((group) => <div className="company-nav-group" key={group.group}><span className="branch-nav-label">{group.group}</span>{group.items.map((item) => <button className={item === activeSection ? 'active' : ''} key={item} type="button" onClick={() => setActiveSection(item)}><span className="member-nav-mark" aria-hidden="true" />{item}</button>)}</div>)}
        </nav>
      </aside>

      <div className="member-content">
        <div className="member-heading"><div><p className="eyebrow">FitFlow company admin portal</p><h1>{activeSection === 'Dashboard' ? 'Good morning, Casey.' : activeSection}</h1></div><button className="notification-button" type="button" aria-label="View notifications">6</button></div>
        {activeSection === 'Dashboard' ? <>
          <section className="member-welcome company-welcome"><div><span className="member-kicker">Tuesday, September 5 · All branches</span><h2>The whole network, in view.</h2><p>Track the health and momentum of your fitness business.</p></div><button type="button" className="member-primary-button" onClick={() => setActiveSection('Reports & Analytics')}>Open analytics <span aria-hidden="true">-&gt;</span></button></section>
          <div className="member-stat-grid company-stat-grid"><article><span>Total members</span><strong>4,862 <small>members</small></strong><em>+6.4% this month</em></article><article><span>Active branches</span><strong>08 <small>locations</small></strong><em>All operating normally</em></article><article><span>Monthly revenue</span><strong>$186k</strong><em>+11.8% vs last month</em></article><article><span>Network attendance</span><strong>74<small>%</small></strong><em>+4.2% this week</em></article></div>
          <div className="company-performance"><div className="member-card company-branches-card"><div className="member-card-heading"><h3>Branch performance</h3><button type="button" onClick={() => setActiveSection('Branch Comparison')}>Compare all</button></div><div className="company-branch-row"><div><strong>Downtown</strong><span>1,248 members · 92% target</span></div><strong>$42.8k</strong><div className="company-bar"><span style={{ width: '92%' }} /></div></div><div className="company-branch-row"><div><strong>Westside</strong><span>936 members · 81% target</span></div><strong>$34.2k</strong><div className="company-bar"><span style={{ width: '81%' }} /></div></div><div className="company-branch-row"><div><strong>North Park</strong><span>764 members · 76% target</span></div><strong>$28.9k</strong><div className="company-bar"><span style={{ width: '76%' }} /></div></div></div><div className="member-card company-focus-card"><div className="member-card-heading"><h3>Needs attention</h3><button type="button" onClick={() => setActiveSection('Notifications & Announcements')}>See alerts</button></div><div className="company-focus-item"><span className="alert-mark">!</span><div><strong>42 renewals due soon</strong><span>Across 5 branches</span></div></div><div className="company-focus-item"><span className="alert-mark company-alert-mark">$</span><div><strong>$8,420 outstanding</strong><span>Pending payments this week</span></div></div><div className="company-focus-item"><span className="alert-mark company-alert-mark">+</span><div><strong>18 new leads today</strong><span>Conversion rate at 24%</span></div></div></div></div>
        </> : <section className="member-empty-state"><span className="member-empty-mark">{activeSection.slice(0, 2).toUpperCase()}</span><h2>{activeSection}</h2><p>Your {activeSection.toLowerCase()} workspace will appear here. This area is ready for the next FitFlow company feature.</p><button type="button" className="member-primary-button" onClick={() => setActiveSection('Dashboard')}>Back to dashboard <span aria-hidden="true">-&gt;</span></button></section>}
      </div>
    </div>
  )
}

export default CompanyAdminPortal
