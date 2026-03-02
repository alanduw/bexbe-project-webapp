import {useState} from "react";
import {ISSUE_STATUS_TYPES, ISSUE_TYPES, PRIORITY_TYPES, STATUS_LABELS} from "../../common/common.ts";
import {POINTS} from "../../common/seeds.ts";
import {API_BASE} from "../../api/api.ts";

export function NewIssueModal({ onClose, onSave, sprints, people, accessToken }) {
    const defaultSprint = sprints.length ? sprints[0].id : -1;
    const [form, setForm] = useState({
        title: "",
        type: ISSUE_TYPES.TASK,
        priority: PRIORITY_TYPES.MEDIUM,
        status: ISSUE_STATUS_TYPES.BACKLOG,
        assignee: people[0].id,
        sprint: defaultSprint,
        points: POINTS[2],
        tags: ""
    });

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
    const save = () => {
        if (!form.title.trim()) return;
        addIssue({
            ...form,
            assignee: Number(form.assignee),
            points: Number(form.points),
            created: new Date().toISOString().slice(0, 10)
        })
            .then(data => {
                console.log("NEW ISSUE MODAL");
                console.log(data);

                onSave({
                    ...data,
                    id: data.id,
                    tags: data.tags.split(",").map(t => t.trim())
                });
                onClose();
            })
            .catch(err => {console.log(err)});
    };
    const addIssue = async (issue) => {
        const res = await fetch(`${API_BASE}/api/issues?accessToken=${accessToken}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(issue),
        });
        return await res.json();
    };

    return (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
            <div className="modal">
                <div className="modal-header">
                    <span className="modal-title">Create New Issue</span>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>

                <div className="modal-body">
                    <div className="form-group">
                        <label className="form-label">Title</label>
                        <input className="form-input" placeholder="Describe the issue..." value={form.title} onChange={e => set("title", e.target.value)} />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Type</label>
                            <select className="form-select" value={form.type} onChange={e => set("type", e.target.value)}>
                                {Object.values(ISSUE_TYPES).map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Priority</label>
                            <select className="form-select" value={form.priority} onChange={e => set("priority", e.target.value)}>
                                {Object.values(PRIORITY_TYPES).map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Status</label>
                            <select className="form-select" value={form.status} onChange={e => set("status", e.target.value)}>
                                {Object.values(ISSUE_STATUS_TYPES).map(s => <option key={s} value={s}>{STATUS_LABELS[s.toUpperCase()]}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Assignee</label>
                            <select className="form-select" value={form.assignee} onChange={e => set("assignee", e.target.value)}>
                                {people.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Sprint</label>
                            <select className="form-select" value={form.sprint} onChange={e => set("sprint", e.target.value)}>
                                {sprints.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Points</label>
                            <select className="form-select" value={form.points} onChange={e => set("points", e.target.value)}>
                                {POINTS.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Tags (comma-separated)</label>
                        <input className="form-input" placeholder="e.g. auth, mobile, ui" value={form.tags} onChange={e => set("tags", e.target.value)} />
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
                        <button className="btn btn-primary" onClick={save}>Create Issue</button>
                    </div>
                </div>
            </div>
        </div>
    );
}