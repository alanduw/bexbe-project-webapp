import {ISSUE_STATUS_TYPES, ISSUE_TYPES, TABS} from "../../common/common.ts";

export function Sidebar({issues, filteredIssues, tab, setTab, user}) {

    const unresolvedBugs = issues.filter(i => i.type === ISSUE_TYPES.BUG && i.status !== ISSUE_STATUS_TYPES.DONE);

    const SIDEBAR_CONFIG = [
        { ...TABS.DASHBOARD, badge: undefined, badgeUrgent: undefined },
        { ...TABS.ISSUES, badge: filteredIssues.length, badgeUrgent: undefined },
        { ...TABS.BUGS, badge: unresolvedBugs.length, badgeUrgent: true },
        { ...TABS.SPRINTS, badge: undefined, badgeUrgent: undefined},
    ];

    return (
        <>
            <div className="sidebar">
                <div className="sidebar-logo">
                    <div className="logo-mark">BxB</div>
                    <div>
                        <div className="logo-text">BeXBe</div>
                        <div className="logo-sub">Project</div>
                    </div>
                </div>
                <div className="sidebar-section">
                    <div className="sidebar-label">Workspace</div>
                    {SIDEBAR_CONFIG.map(item => (
                        <div key={item.id} className={`nav-item ${tab.id === item.id ? "active" : ""}`} onClick={() => setTab(item)}>
                            <span className="nav-icon">{item.icon}</span>
                            {item.label}
                            {item.badge !== undefined && (
                                <span className={`nav-badge ${item.badgeUrgent && item.badge > 0 ? "urgent" : ""}`}>{item.badge}</span>
                            )}
                        </div>
                    ))}
                </div>
                <div className="sidebar-bottom">
                    <div className="avatar-row">
                        <div className="avatar">{user.abrName}</div>
                        <div className="avatar-info">
                            <div className="avatar-name">{user.name}</div>
                            <div className="avatar-role">{user.role}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

