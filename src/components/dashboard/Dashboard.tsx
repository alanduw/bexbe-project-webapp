import {ISSUE_STATUS_TYPES, ISSUE_TYPES, PRIORITY_TYPES, TYPE_COLORS} from "../../common/common.ts";
import {StatusPill, TypeBadge} from "../labels/Labels.tsx";

export function Dashboard({issues, sprints, people}) {
    const bugs = issues.filter(i => i.type === ISSUE_TYPES.BUG);
    const criticalBugs = issues.filter(i => i.type === ISSUE_TYPES.BUG && i.priority === PRIORITY_TYPES.CRITICAL);
    const inProgress = issues.filter(i => i.status === ISSUE_STATUS_TYPES.IN_PROGRESS);
    const done = issues.filter(i => i.status === ISSUE_STATUS_TYPES.DONE);
    const openIssues = issues.filter(i => i.status !== ISSUE_STATUS_TYPES.DONE);

    const totalPoints = issues.reduce((a, b) => a + b.points, 0);

    const lastUpToFourSprints = sprints.filter(sprint => sprint.id !== -1).slice(-4);
    const velocities = lastUpToFourSprints.map(s => {
        return issues.filter(i => i.sprint === s.id).reduce((a, b) => a + b.points, 0)
    })
    const maxV = Math.max(...velocities);

    const byType = Object.values(ISSUE_TYPES).map(type => ({ type, count: issues.filter(i => i.type === type).length }));
    const byStatus = Object.values(ISSUE_STATUS_TYPES).map(status => ({ status, count: issues.filter(i => i.status === status).length }));

    return (
        <div>
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-label">Open Issues</div>
                    <div className="stat-value" style={{ color: "var(--accent)" }}>{openIssues.length}</div>
                    <div className="stat-sub">{issues.length} total</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Critical Bugs</div>
                    <div className="stat-value" style={{ color: "#ff3b3b" }}>{criticalBugs.length}</div>
                    <div className="stat-sub">{bugs.length} bugs total</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">In Progress</div>
                    <div className="stat-value" style={{ color: "#a09af7" }}>{inProgress.length}</div>
                    <div className="stat-sub">{done.length} completed</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Story Points</div>
                    <div className="stat-value">{totalPoints}</div>
                    <div className="stat-sub">across all sprints</div>
                </div>
            </div>

            <div className="stats-grid-2">
                <div className="stat-card">
                    <div className="stat-label">Sprint Velocity</div>
                    <div className="velocity-chart">
                        {lastUpToFourSprints.map((s, i) => {
                            return (
                                <div key={s.id} className="velocity-bar" style={
                                    { height: `${(velocities[i] / maxV) * 100}%`, background: i === lastUpToFourSprints.length - 1 ? "rgba(94,184,255,0.3)" : "var(--accent-dim)" }
                                }>
                                    <span className="velocity-bar-label">{s.name.replace("Sprint ", "S")}</span>
                                </div>
                        )})}
                    </div>
                    <div style={{ display: "flex", gap: 100, marginTop: 24, flexWrap: "wrap" }}>
                        {lastUpToFourSprints.map((s, i) => (
                            <span key={s.id} className="velocity-sublabel">
                                {s.name}: <strong style={{ color: "var(--text)" }}>{velocities[i]} pts</strong>
                            </span>
                        ))}
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-label">Issues by Type</div>
                    <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                        {byType.filter(b => b.count > 0).map(({ type, count }) => (
                            <div key={type} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <TypeBadge type={type} />
                                <div style={{ flex: 1, height: 6, background: "var(--surface3)", borderRadius: 3, overflow: "hidden" }}>
                                    <div style={{ height: "100%", width: `${(count / issues.length) * 100}%`, background: TYPE_COLORS[type.toUpperCase()], borderRadius: 3 }} />
                                </div>
                                <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-dim)", minWidth: 16, textAlign: "right" }}>
                                {count}
                            </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-label">Pipeline Status</div>
                    <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                        {byStatus.map(({ status, count }) => (
                            <div key={status} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <StatusPill status={status} />
                                <div style={{ flex: 1, height: 6, background: "var(--surface3)", borderRadius: 3, overflow: "hidden" }}>
                                    <div style={{ height: "100%", width: `${issues.length ? (count / issues.length) * 100 : 0}%`, background: status === ISSUE_STATUS_TYPES.DONE ? "#4caf8a" : status === ISSUE_STATUS_TYPES.IN_PROGRESS ? "#a09af7" : "var(--border2)", borderRadius: 3 }} />
                                </div>
                                <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-dim)", minWidth: 16, textAlign: "right" }}>{count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-label">Team Workload</div>
                    <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
                        {people.map(person => {
                            const assigned = issues.filter(i => i.assignee === person.id);
                            const pts = assigned.reduce((a, b) => a + b.points, 0);

                            return (
                                <div key={person.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <div className="mini-avatar">{person.abrName}</div>
                                    <span style={{ fontSize: 12, minWidth: 70 }}>{person.name}</span>
                                    <div style={{ flex: 1, height: 6, background: "var(--surface3)", borderRadius: 3, overflow: "hidden" }}>
                                        <div style={{ height: "100%", width: `${Math.min((pts / 40) * 100, 100)}%`, background: "var(--accent)", borderRadius: 3 }} />
                                    </div>
                                    <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-dim)", minWidth: 40, textAlign: "right" }}>{pts} pts</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}