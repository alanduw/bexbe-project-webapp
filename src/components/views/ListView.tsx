import {useState} from "react";
import {ISSUE_STATUS_TYPES, PRIORITY_TYPES} from "../../common/common.ts";
import {Assignee, PriorityBadge, StatusPill, TypeBadge} from "../labels/Labels.tsx";
import {DEFAULT_PERSON} from "../../common/seeds.ts";

export function ListView({ issues, people, onIssueClick, sprints }) {
    const [sort, setSort] = useState({ col: "id", dir: -1 });
    const sortBy = (col) => setSort(s => ({ col, dir: s.col === col ? -s.dir : 1 }));
    const sorted = [...issues].sort((a, b) => {
        let av = a[sort.col], bv = b[sort.col];
        if (sort.col === "priority") {
            av = Object.values(PRIORITY_TYPES).indexOf(av);
            bv = Object.values(PRIORITY_TYPES).indexOf(bv);
        }
        if (sort.col === "status") {
            av = Object.values(ISSUE_STATUS_TYPES).indexOf(av);
            bv = Object.values(ISSUE_STATUS_TYPES).indexOf(bv);
        }
        return (av > bv ? 1 : av < bv ? -1 : 0) * sort.dir;
    });

    const Th = ({ col, children }) => (
        <th onClick={() => sortBy(col)}>
            {children} {sort.col === col ? (sort.dir > 0 ? "↑" : "↓") : ""}
        </th>
    );
    return (
        <table className="issue-table">
            <thead>
            <tr>
                <Th col="id">ID</Th>
                <Th col="type">Type</Th>
                <th>Title</th>
                <Th col="priority">Priority</Th>
                <Th col="status">Status</Th>
                <Th col="assignee">Assignee</Th>
                <Th col="sprint">Sprint</Th>
                <Th col="points">Pts</Th>
                <th>Tags</th>
            </tr>
            </thead>
            <tbody>
            {sorted.map(issue => {
                const peopleMatched = people.filter(person => person.id === issue.assignee);
                const matchedPerson = peopleMatched.length > 0 ? peopleMatched[0] : DEFAULT_PERSON;

                return (
                    <tr key={issue.id} onClick={() => onIssueClick(issue)}>
                        <td><span className="issue-id">{issue.id}</span></td>
                        <td><TypeBadge type={issue.type} /></td>
                        <td><span className="issue-title">{issue.title}</span></td>
                        <td><PriorityBadge priority={issue.priority} /></td>
                        <td><StatusPill status={issue.status} /></td>
                        <td><Assignee assignee={matchedPerson} /></td>
                        <td style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-dim)" }}>{
                            issue.sprint === -1 ? "None" : sprints.filter(sprint => issue.sprint === sprint.id)[0].name
                        }</td>
                        <td><span className="points-badge">{issue.points}</span></td>
                        <td><div className="tags">{issue.tags.map((t, i) => <span key={t + i} className="tag">{t}</span>)}</div></td>
                    </tr>
            )})}
            </tbody>
        </table>
    );


}