import './App.css'
import {Sidebar} from "./components/sidebar/Sidebar.tsx";
import {useEffect, useState} from "react";
import {DEFAULT_PERSON, DEFAULT_SPRINT, SEED_ISSUES, SEED_PEOPLE, SEED_SPRINTS} from "./common/seeds.ts";
import {ISSUE_STATUS_TYPES, ISSUE_TYPES, PRIORITY_TYPES, SEARCH_ICON, STATUS_LABELS, TABS} from "./common/common.ts";
import {Dashboard} from "./components/dashboard/Dashboard.tsx";
import {SprintView} from "./components/views/SprintView.tsx";
import {IssueDetailModal} from "./components/modals/IssueDetailModal.tsx";
import {NewIssueModal} from "./components/modals/NewIssueModal.tsx";
import {NewSprintModal} from "./components/modals/NewSprintModal.tsx";
import {ListView} from "./components/views/ListView.tsx";
import {BoardView} from "./components/views/BoardView.tsx";
import {NewUserModal} from "./components/modals/NewUserModal.tsx";
import {API_BASE} from "./api/api.ts";

function App() {
    let appState;
    try {
        const serialized = localStorage.getItem("appState");
        appState = serialized ? JSON.parse(serialized) : undefined;
    } catch {
        appState = undefined;
    }
    const [issues, setIssues] = useState([]);
    const [sprints, setSprints] = useState([DEFAULT_SPRINT]);
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({ type: "", priority: "", status: "", assignee: undefined });
    const [user, setUser] = useState({
            id: appState.owner.id,
            name: appState.owner.firstName + " " + appState.owner.lastName,
            abrName: appState.owner.abrName,
            role: appState.owner.role,
        });
    const [people, setPeople] = useState([user]);
    const [accessToken, setAccessToken] = useState(appState.accessToken);

    const [selected, setSelected] = useState(null);
    const [view, setView] = useState("list");

    const [showNewIssue, setShowNewIssue] = useState(false);
    const [showNewSprint, setShowNewSprint] = useState(false);
    const [showNewUser, setShowNewUser] = useState(false);

    const [tab, setTab] = useState(TABS.DASHBOARD);

    useEffect(() => {
        fetch(`${API_BASE}/api/projects?accessToken=${accessToken}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(r => r.json())
            .then(data => {
                console.log("GET PROJECT DATA");
                console.log(data);

                setUser({
                    ...data.owner,
                    name: data.owner.firstName + " " + data.owner.lastName,
                });
                setPeople([user, ...data.users.map(user => ({
                    ...user,
                    name: user.firstName + " " + user.lastName,
                }))]);
                setSprints([DEFAULT_SPRINT, ...data.sprints]);
                setIssues(data.issues.map(issue => ({
                    ...issue,
                    tags: issue.tags.split(",").map(t => t.trim()),
                })));
            });

    }, [accessToken]);

    const addIssue = (issue) => setIssues(prev => [...prev, issue]);
    const addPeople = (userAdded) => setPeople(prev => [...prev, userAdded])
    const updateIssue = (updated) => setIssues(prev => prev.map(i => i.id === updated.id ? updated : i));
    const addSprint = (sprint) => setSprints(prev => [...prev, sprint]);
    const clearFilter = (key) => setFilters(f => ({ ...f, [key]: "" }));

    const filteredIssues = issues.filter(i => {
        if (search
            && !i.title.toLowerCase().includes(search.toLowerCase())
            && !i.id.toString().toLowerCase().includes(search.toLowerCase())
        ) return false;
        if (filters.type && i.type !== filters.type) return false;
        if (filters.priority && i.priority !== filters.priority) return false;
        if (filters.status && i.status !== filters.status) return false;
        if (filters.assignee && i.assignee.toString() !== filters.assignee) return false;
        return true;
    });

    const activeFilters = Object.entries(filters).filter(([, v]) => v);

    let content;
    if (tab.id === TABS.DASHBOARD.id) {
        content = <Dashboard issues={issues} sprints={sprints} people={people}/>
    } else if (tab.id === TABS.SPRINTS.id) {
        content = <SprintView issues={filteredIssues} people={people} onIssueClick={setSelected} sprints={sprints} onNewSprint={() => setShowNewSprint(true)}/>
    } else {
        const displayIssues = tab.id === TABS.BUGS.id
            ? filteredIssues.filter(i => i.type === ISSUE_TYPES.BUG) : filteredIssues;

        content = (
            <>
                <div className="tab-bar" style={{ padding: "0 0 0 0", marginBottom: 16 }}>
                    {["list", "board"].map(v => (
                        <div key={v} className={`tab ${view === v ? "active" : ""}`} onClick={() => setView(v)} style={{ textTransform: "capitalize" }}>{v}</div>
                    ))}
                </div>

                <div className="filters">
                    <select className="filter-select" value={filters.type} onChange={e => setFilters(f => ({ ...f, type: e.target.value }))}>
                        <option value="">All Types</option>{Object.values(ISSUE_TYPES).map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <select className="filter-select" value={filters.priority} onChange={e => setFilters(f => ({ ...f, priority: e.target.value }))}>
                        <option value="">All Priorities</option>{Object.values(PRIORITY_TYPES).map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <select className="filter-select" value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}>
                        <option value="">All Statuses</option>{Object.values(ISSUE_STATUS_TYPES).map(s => <option key={s} value={s}>{STATUS_LABELS[s.toUpperCase()]}</option>)}
                    </select>
                    <select className="filter-select" value={filters.assignee} onChange={e => setFilters(f => ({ ...f, assignee: e.target.value }))}>
                        <option value="">All Assignees</option>{people.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                    {activeFilters.length > 0 && (
                        <div className="active-filters">
                            {activeFilters.map(([k, v]) => {
                                const peopleMatched = people.filter(person => person.id.toString() === v);
                                const matchedPerson = peopleMatched.length > 0 ? peopleMatched[0] : DEFAULT_PERSON;

                                let valueToShow = v;
                                if (k === "assignee") valueToShow = matchedPerson.name;
                                if (k === "status") valueToShow = STATUS_LABELS[v.toUpperCase()];

                                return (
                                    <span key={k} className="filter-chip" onClick={() => clearFilter(k)}>{k}: {valueToShow} ×</span>
                                )
                            })}
                        </div>
                    )}
                    <span style={{ marginLeft: "auto", fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-dimmer)" }}>
                        {displayIssues.length} issues
                    </span>
                </div>

                {view === "list" ?
                    <ListView issues={displayIssues} people={people} onIssueClick={setSelected} sprints={sprints} />
                    : <BoardView issues={displayIssues} people={people} onIssueClick={setSelected} />}
            </>
        )
    }

  return (
    <>
      <div className="app">
          <Sidebar issues={issues} filteredIssues={filteredIssues} tab={tab} setTab={setTab} user={user}/>
          {/* MAIN */}
          <div className="main">
              <div className="header">
                  <span className="header-title">
                      {tab.headerName}
                  </span>
                  <div className="header-spacer" />
                  <div className="search-box">
                      <span className="search-icon">{SEARCH_ICON}</span>
                      <input placeholder="Search issues..." value={search} onChange={e => setSearch(e.target.value)} />
                  </div>
                  <button className="btn btn-primary" onClick={() => setShowNewIssue(true)}>+ New Issue</button>
                  <button className="btn btn-primary" onClick={() => setShowNewUser(true)}>+ New User</button>
              </div>
              <div className="content">{content}</div>
          </div>

          {/* MODALS */}
          {showNewIssue && <NewIssueModal
              onClose={() => setShowNewIssue(false)}
              onSave={addIssue}
              sprints={[...sprints].sort((a,b) => b.start.localeCompare(a.start))}
              people={people}
              accessToken={accessToken}
          />}
          {showNewUser && <NewUserModal
              onClose={() => setShowNewUser(false)}
              onSave={addPeople}
              accessToken={accessToken}
          />}
          {showNewSprint && <NewSprintModal
              onClose={() => setShowNewSprint(false)}
              onSave={addSprint}
              accessToken={accessToken}
          />}
          {selected && <IssueDetailModal
              issue={selected}
              people={people}
              onClose={() => setSelected(null)}
              onUpdate={updateIssue}
              sprints={sprints}
          />}
      </div>
    </>
  )
}

export default App
