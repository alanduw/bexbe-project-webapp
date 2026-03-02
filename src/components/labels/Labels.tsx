import {PRIORITY_COLORS, STATUS_LABELS, TYPE_COLORS, TYPE_ICONS} from "../../common/common.ts";

export function TypeBadge({ type }) {
    return (
        <span className="issue-type-badge" style={{ background: `${TYPE_COLORS[type.toUpperCase()]}18`, color: TYPE_COLORS[type.toUpperCase()] }}>
      {TYPE_ICONS[type.toUpperCase()]} {type}
    </span>
    );
}

export function PriorityBadge({ priority }) {
    return (
        <span className="priority-badge">
            <span className="priority-dot" style={{ background: PRIORITY_COLORS[priority.toUpperCase()], color: PRIORITY_COLORS[priority.toUpperCase()] }} />
            {priority}
        </span>
    );
}

export function StatusPill({ status }) {
    return <span className={`status-pill status-${status}`}>{STATUS_LABELS[status.toUpperCase()]}</span>;
}

export function Assignee({ assignee }) {
    return (
        <div className="assignee-chip">
            <div className="mini-avatar">{assignee.abrName}</div>
            <span className="assignee-name">{assignee.name}</span>
        </div>
    );
}