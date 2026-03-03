import {useState} from "react";
import {Assignee, PriorityBadge, TypeBadge} from "../labels/Labels.tsx";
import {ISSUE_STATUS_TYPES, STATUS_LABELS} from "../../common/common.ts";
import {DEFAULT_PERSON} from "../../common/seeds.ts";
import {API_BASE} from "../../api/api.ts";

export function IssueDetailModal({ issue, people, onClose, onUpdate, sprints }) {
    const [status, setStatus] = useState(issue.status);
    const [loading, setLoading] = useState(false);

    const save = () => {
        setLoading(true);
        updateIssue({...issue, status})
            .then(data => {
                onUpdate({...data, tags: data.tags.split(",").map(t => t.trim())});
                onClose();
            })
            .catch(err => {console.log(err)})
            .finally(() => {setLoading(false)});
    };
    const updateIssue = async (issue) => {
        const res = await fetch(`${API_BASE}/api/issues/${issue.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...issue, tags: issue.tags.join(",")}),
        });
        return await res.json();
    };

    const peopleMatched = people.filter(person => person.id === issue.assignee);
    const matchedPerson = peopleMatched.length > 0 ? peopleMatched[0] : DEFAULT_PERSON;

    return (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
            <div className="modal">
                <div className="modal-header">
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--text-dimmer)" }}>{issue.id}</span>
                        <TypeBadge type={issue.type} />
                    </div>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>
                <div className="modal-body">
                    <div style={{ fontSize: 18, fontWeight: 700 }}>{issue.title}</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <PriorityBadge priority={issue.priority} />
                        <Assignee assignee={matchedPerson} />
                        <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-dim)" }}>
                            {issue.sprint === -1 ? "None" : sprints.filter(sprint => issue.sprint === sprint.id)[0].name}
                        </span>
                        <span className="points-badge">{issue.points} pts</span>
                    </div>
                    <div className="tags">{issue.tags.map((t, i) => <span key={t + i} className="tag">{t}</span>)}</div>
                    <div className="form-group">
                        <label className="form-label">Status</label>
                        <select className="form-select" value={status} onChange={e => setStatus(e.target.value)}>
                            {Object.values(ISSUE_STATUS_TYPES).map(s => <option key={s} value={s}>{STATUS_LABELS[s.toUpperCase()]}</option>)}
                        </select>
                    </div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-dimmer)" }}>Created {issue.created}</div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-ghost" onClick={onClose}>Close</button>
                    <button className="btn btn-primary" onClick={save} disabled={loading}>
                        {loading ? (
                            <span className="spinner" />
                        ) : (
                            "Update Status"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}