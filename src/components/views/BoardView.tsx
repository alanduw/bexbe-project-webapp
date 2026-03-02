import {ISSUE_STATUS_TYPES, PRIORITY_COLORS, STATUS_LABELS} from "../../common/common.ts";
import {Assignee, TypeBadge} from "../labels/Labels.tsx";
import {DEFAULT_PERSON} from "../../common/seeds.ts";

export function BoardView({ issues, people, onIssueClick }) {
    return (
        <div className="board">
            {Object.values(ISSUE_STATUS_TYPES).map(status => {
                const cols = issues.filter(i => i.status === status);
                return (
                    <div key={status} className="board-col">
                        <div className="col-header">
              <span className="col-title" style={{ color: status === "in-progress" ? "#a09af7" : status === "done" ? "#4caf8a" : "var(--text-dim)" }}>
                {STATUS_LABELS[status.toUpperCase()]}
              </span>
                            <span className="col-count">{cols.length}</span>
                        </div>
                        <div className="col-cards">
                            {cols.length === 0 && <div className="empty-state" style={{ padding: 20, fontSize: 11 }}>No issues</div>}
                            {cols.map(issue => {
                                const peopleMatched = people.filter(person => person.id === issue.assignee);
                                const matchedPerson = peopleMatched.length > 0 ? peopleMatched[0] : DEFAULT_PERSON;

                                return (
                                    <div key={issue.id} className="kanban-card" onClick={() => onIssueClick(issue)}>
                                        <div className="card-header">
                                            <TypeBadge type={issue.type} />
                                            <span className="priority-dot" style={{ background: PRIORITY_COLORS[issue.priority.toUpperCase()], color: PRIORITY_COLORS[issue.priority.toUpperCase()] }} />
                                        </div>
                                        <div className="card-title">{issue.title}</div>
                                        <div className="card-footer">
                                            <Assignee assignee={matchedPerson} />
                                            <span className="points-badge">{issue.points}</span>
                                        </div>
                                    </div>
                            )})}
                        </div>
                    </div>
                );
            })}
        </div>
    )
}