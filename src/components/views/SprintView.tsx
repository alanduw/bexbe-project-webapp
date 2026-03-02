import {ISSUE_STATUS_TYPES, TABS} from "../../common/common.ts";
import {Assignee, PriorityBadge, StatusPill, TypeBadge} from "../labels/Labels.tsx";
import {DEFAULT_PERSON} from "../../common/seeds.ts";

export function SprintView({ issues, people, onIssueClick, sprints, onNewSprint }) {
    const sortedSprints = [...sprints].filter(sprint => sprint.id !== -1).sort((a, b) => {
        if (a.start && b.start) return b.start.localeCompare(a.start);
        return b.name.localeCompare(a.name);
    });

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
                <button className="btn btn-primary" onClick={onNewSprint}>+ New Sprint</button>
            </div>
            {sortedSprints.length === 0 && (
                <div className="empty-state"><div className="empty-icon">{TABS.SPRINTS.icon}</div>No sprints yet. Create one to get started.</div>
            )}
            {sortedSprints.map(sprint => {
                const sprintIssues = issues.filter(i => i.sprint === sprint.id);
                const done = sprintIssues.filter(i => i.status === ISSUE_STATUS_TYPES.DONE).length;
                const percentDone = sprintIssues.length ? Math.round((done / sprintIssues.length) * 100) : 0;
                const totalPts = sprintIssues.reduce((a, b) => a + b.points, 0);

                return (
                    <div key={sprint.id} className="sprint-section">
                        <div className="sprint-header">
                            <span className="sprint-name">{sprint.name}</span>
                            {sprint.start && sprint.end && (
                                <span className="sprint-dates">{sprint.start} → {sprint.end}</span>
                            )}
                            <div className="sprint-progress-bar"><div className="sprint-progress-fill" style={{ width: `${percentDone}%` }} /></div>
                            <span className="sprint-pct">{percentDone}%</span>
                            <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-dimmer)" }}>{done}/{sprintIssues.length} · {totalPts} pts</span>
                        </div>

                        {sprint.goal && (
                            <div style={{ marginBottom: 10, padding: "7px 12px", background: "var(--surface2)", borderLeft: "3px solid var(--accent)", borderRadius: "0 4px 4px 0", fontSize: 12, color: "var(--text-dim)", fontStyle: "italic" }}>
                                🎯 {sprint.goal}
                            </div>
                        )}
                        {sprintIssues.length === 0 ? (
                            <div className="empty-state" style={{ padding: 20, fontSize: 11 }}>No issues in this sprint</div>
                        ) : (
                            <table className="issue-table">
                                <thead>
                                    <tr>
                                        <th>ID</th><th>Type</th><th>Title</th><th>Priority</th><th>Status</th><th>Assignee</th><th>Pts</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {sprintIssues.map(issue => {
                                    const peopleMatched = people.filter(person => person.id === issue.assignee);
                                    const matchedPerson = peopleMatched.length > 0 ? peopleMatched[0] : DEFAULT_PERSON;

                                    return (
                                        <tr key={issue.id} onClick={() => onIssueClick(issue)}>
                                            <td><span className="issue-id">{issue.id}</span></td>
                                            <td><TypeBadge type={issue.type}/></td>
                                            <td><span className="issue-title">{issue.title}</span></td>
                                            <td><PriorityBadge priority={issue.priority}/></td>
                                            <td><StatusPill status={issue.status}/></td>
                                            <td><Assignee assignee={matchedPerson}/>
                                            </td>
                                            <td><span className="points-badge">{issue.points}</span></td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        )}
                    </div>
                );
            })}
        </div>
    );
}