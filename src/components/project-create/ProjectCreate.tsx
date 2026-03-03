import {useState} from "react";
import {API_BASE} from "../../api/api.ts";
import {useNavigate} from "react-router-dom";

export function ProjectCreate() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        useSeed: false,
        ownerFirstName: "",
        ownerLastName: "",
        ownerRole: "",
    });
    const [loading, setLoading] = useState(false);

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
    const save = (isDemo) => {
        if (!form.ownerFirstName.trim()) return;
        if (!form.ownerLastName.trim()) return;
        setLoading(true);
        const useSeed = isDemo;
        addProject({...form, useSeed})
            .then(data => {
                console.log(data);
                localStorage.setItem("appState", JSON.stringify(data));
                navigate("/app");
            })
            .catch(err => {console.log(err)})
            .finally(() => {setLoading(false)});
    };

    const addProject = async (project) => {
        const res = await fetch(`${API_BASE}/api/projects`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(project),
        });
        return await res.json();
    };

    return (
        <>
            <div className="app">
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <span className="modal-title">Create New Project</span>
                        </div>

                        <div className="modal-body">
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">First Name</label>
                                    <input className="form-input" placeholder="My first name..." value={form.ownerFirstName} onChange={e => set("ownerFirstName", e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Last Name</label>
                                    <input className="form-input" placeholder="My last name..." value={form.ownerLastName} onChange={e => set("ownerLastName", e.target.value)} />
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button className="btn btn-primary" onClick={() => save(false)} disabled={loading}>
                                    {loading ? (
                                        <span className="spinner" />
                                    ) : (
                                        "Create Empty Project"
                                    )}
                                </button>
                                <button className="btn btn-primary" onClick={() => save(true)} disabled={loading}>
                                    {loading ? (
                                        <span className="spinner" />
                                    ) : (
                                        "Create Demo Project"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}