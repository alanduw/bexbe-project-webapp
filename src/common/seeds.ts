export const SEED_ISSUES = [
    {
        id: 1,
        title: "Login page crashes on mobile Safari",
        type: "bug",
        priority: "critical",
        status: "in_progress",
        assignee: 1,
        sprint: 2,
        points: 3,
        created: "2024-01-15",
        tags: ["auth", "mobile"]
    },
    {
        id: 2,
        title: "Implement dark mode toggle",
        type: "feature",
        priority: "medium",
        status: "todo",
        assignee: 2,
        sprint: 2,
        points: 5,
        created: "2024-01-14",
        tags: ["ui", "settings"]
    },
    {
        id: 3,
        title: "Refactor API rate limiting middleware",
        type: "task",
        priority: "high",
        status: "review",
        assignee: 3,
        sprint: 1,
        points: 8,
        created: "2024-01-13",
        tags: ["api", "performance"]
    },
    {
        id: 4,
        title: "User onboarding flow",
        type: "story",
        priority: "high",
        status: "backlog",
        assignee: 1,
        sprint: 3,
        points: 13,
        created: "2024-01-12",
        tags: ["ux", "onboarding"]
    },
    {
        id: 5,
        title: "Search returns stale cache results",
        type: "bug",
        priority: "high",
        status: "todo",
        assignee: 2,
        sprint: 2,
        points: 2,
        created: "2024-01-11",
        tags: ["search", "cache"]
    },
    {
        id: 6,
        title: "Export reports to PDF",
        type: "feature",
        priority: "low",
        status: "backlog",
        assignee: 3,
        sprint: 3,
        points: 5,
        created: "2024-01-10",
        tags: ["reports"]
    },
    {
        id: 7,
        title: "Database query optimization",
        type: "task",
        priority: "high",
        status: "in_progress",
        assignee: 1,
        sprint: 2,
        points: 8,
        created: "2024-01-09",
        tags: ["db", "performance"]
    },
    {
        id: 8,
        title: "404 error on profile page redirect",
        type: "bug",
        priority: "medium",
        status: "done",
        assignee: 2,
        sprint: 1,
        points: 1,
        created: "2024-01-08",
        tags: ["routing"]
    },
    {
        id: 9,
        title: "Notification system infrastructure",
        type: "epic",
        priority: "critical",
        status: "in_progress",
        assignee: 3,
        sprint: 2,
        points: 21,
        created: "2024-01-07",
        tags: ["notifications", "infra"]
    },
    {
        id: 10,
        title: "Two-factor authentication",
        type: "feature",
        priority: "high",
        status: "todo",
        assignee: 1,
        sprint: 3,
        points: 8,
        created: "2024-01-06",
        tags: ["auth", "security"]
    },
    {
        id: 11,
        title: "CSV import validation fails silently",
        type: "bug",
        priority: "critical",
        status: "todo",
        assignee: 2,
        sprint: 2,
        points: 3,
        created: "2024-01-05",
        tags: ["import", "data"]
    },
    {
        id: 12,
        title: "Redesign settings panel",
        type: "story",
        priority: "low",
        status: "backlog",
        assignee: 3,
        sprint: 4,
        points: 5,
        created: "2024-01-04",
        tags: ["ui", "settings"]
    },
];

export const SEED_SPRINTS = [
    {
        id: 1,
        name: "Sprint 1",
        start: "2024-01-01",
        end: "2024-01-14",
        goal: "Stabilize auth and fix routing bugs",
        issues: [8, 3],
    },
    {
        id: 2,
        name: "Sprint 2",
        start: "2024-01-15",
        end: "2024-01-28",
        goal: "Performance improvements and mobile fixes",
        issues: [11, 9, 7, 5, 2, 1],
    },
    {
        id: 3,
        name: "Sprint 3",
        start: "2024-01-29",
        end: "2024-02-11",
        goal: "Onboarding flow and 2FA",
        issues: [10, 6, 4],
    },
    {
        id: 4,
        name: "Sprint 4",
        start: "2024-02-12",
        end: "2024-02-25",
        goal: "Settings redesign and PDF export",
        issues: [12],
    },
];

export const SEED_PEOPLE = [
    {id: 1, name: "K. Novak", abrName: "KN", role: "Lead Dev"},
    {id: 2, name: "M. Chen", abrName: "MC", role: ""},
    {id: 3, name: "A. Patel", abrName: "AP", role: ""},
]

export const DEFAULT_PERSON = {
    id: "",
    name: "",
    abrName: "",
    role: "",
}


export const DEFAULT_SPRINT = {
    id: -1,
    name: "",
    start: "",
    end: "",
    goal: "",
    issues: [],
}

export const POINTS = [1, 2, 3, 5, 8, 13, 21];