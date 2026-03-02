export const PRIORITY_COLORS = {
    CRITICAL: "#ff3b3b",
    HIGH: "#ff8c00",
    MEDIUM: "#f5c518",
    LOW: "#4caf8a",
};

export const TYPE_ICONS = {
    BUG: "✕",
    FEATURE: "◈",
    TASK: "◻",
    STORY: "◇",
    EPIC: "⬟",
};

export const TYPE_COLORS = {
    BUG: "#ff5252",
    FEATURE: "#7c6af7",
    TASK: "#5eb8ff",
    STORY: "#4caf8a",
    EPIC: "#ff9100",
};

export const TABS = {
    DASHBOARD: {
        id: "dashboard",
        label: "Dashboard",
        headerName: "Overview",
        icon: "⬡",
    },
    ISSUES: {
        id: "issues",
        label: "All Issues",
        headerName: "All Issues",
        icon: TYPE_ICONS.TASK,
    },
    BUGS: {
        id: "bugs",
        label: "Bug Tracker",
        headerName: "Bug Tracker",
        icon: TYPE_ICONS.BUG,
    },
    SPRINTS: {
        id: "sprints",
        label: "Sprints",
        headerName: "Sprint Board",
        icon: "◈",
    },
}

export const ISSUE_TYPES = {
    BUG: "bug",
    FEATURE: "feature",
    TASK: "task",
    STORY: "story",
    EPIC: "epic",
}

export const PRIORITY_TYPES = {
    LOW: "low",
    MEDIUM: "medium",
    HIGH: "high",
    CRITICAL: "critical"
}

export const ISSUE_STATUS_TYPES = {
    BACKLOG: "backlog",
    TODO: "todo",
    IN_PROGRESS: "in_progress",
    REVIEW: "review",
    DONE: "done",
}

export const STATUS_LABELS = {
    BACKLOG: "Backlog",
    TODO: "To Do",
    IN_PROGRESS: "In Progress",
    REVIEW: "Review",
    DONE: "Done",
};

export const SEARCH_ICON = "⌕";