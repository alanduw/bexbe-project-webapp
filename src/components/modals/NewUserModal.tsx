import {useState} from "react";
import {API_BASE} from "../../api/api.ts";

export function NewUserModal({accessToken, onClose, onSave}) {
    const [form, setForm] = useState({
        userFirstName: "",
        userLastName: "",
        userRole: "",
    });
    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
    const save = () => {
        if (!form.userFirstName.trim()) return;
        if (!form.userLastName.trim()) return;
        addUser({...form, accessToken})
            .then(data => {
                onSave({
                    id: data.id,
                    name: data.firstName + " " + data.lastName,
                    abrName: data.abrName,
                    role: data.role,
                });
                onClose();
            })
            .catch(err => {console.log(err)});
    };

    const addUser = async (user) => {
        const res = await fetch(`${API_BASE}/api/projects/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });
        return await res.json();
    };
    return (
        <>
            <div className="app">
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <span className="modal-title">Create New User</span>
                            <button className="modal-close" onClick={onClose}>×</button>
                        </div>

                        <div className="modal-body">
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">First Name</label>
                                    <input className="form-input" placeholder="User's first name..." value={form.userFirstName} onChange={e => set("userFirstName", e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Last Name</label>
                                    <input className="form-input" placeholder="User's last name..." value={form.userLastName} onChange={e => set("userLastName", e.target.value)} />
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
                                <button className="btn btn-primary" onClick={save}>Create User</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}