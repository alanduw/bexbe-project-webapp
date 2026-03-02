import {useState} from "react";
import {SEED_SPRINTS} from "../../common/seeds.ts";
import {API_BASE} from "../../api/api.ts";

export function NewSprintModal({onClose, onSave, accessToken}) {
    const today = new Date().toISOString().slice(0, 10);
    const twoWeeks = new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10);
    const [form, setForm] = useState({ name: "", start: today, end: twoWeeks, goal: "" });

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
    const save = () => {
        if (!form.name.trim()) return;
        addSprint({...form, accessToken})
            .then(data => {
                console.log("NEW SPRINT MODAL");
                console.log(data);

                onSave(data);
                onClose();
            })
            .catch(err => {console.log(err)});
    };
    const addSprint = async (sprint) => {
        const res = await fetch(`${API_BASE}/api/sprints?accessToken=${accessToken}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sprint),
        });
        return await res.json();
    };

    return (
        <>
            <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
                <div className="modal" style={{ width: 440 }}>
                    <div className="modal-header">
                        <span className="modal-title">Create New Sprint</span>
                        <button className="modal-close" onClick={onClose}>×</button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label className="form-label">Sprint Name</label>
                            <input className="form-input" placeholder="e.g. Sprint 15" value={form.name} onChange={e => set("name", e.target.value)} />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Start Date</label>
                                <input type="date" className="form-input" value={form.start} onChange={e => set("start", e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">End Date</label>
                                <input type="date" className="form-input" value={form.end} onChange={e => set("end", e.target.value)} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Sprint Goal</label>
                            <textarea className="form-textarea" placeholder="What is the goal of this sprint?" value={form.goal} onChange={e => set("goal", e.target.value)} style={{ minHeight: 64 }} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
                        <button className="btn btn-primary" onClick={save}>Create Sprint</button>
                    </div>
                </div>
            </div>
        </>
    );
}