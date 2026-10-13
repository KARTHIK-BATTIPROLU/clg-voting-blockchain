// Application Constants

export const DEPARTMENTS = [
    { value: 'CSE', label: 'Computer Science & Engineering' },
    { value: 'IT', label: 'Information Technology' },
    { value: 'ECE', label: 'Electronics & Communication' },
    { value: 'EEE', label: 'Electrical & Electronics' },
    { value: 'MECH', label: 'Mechanical Engineering' },
    { value: 'CIVIL', label: 'Civil Engineering' },
    { value: 'AIDS', label: 'AI & Data Science' },
    { value: 'AIML', label: 'AI & Machine Learning' },
    { value: 'CSM', label: 'Computer Science & AI/ML' },
];

export const YEARS = [
    { value: 1, label: '1st Year' },
    { value: 2, label: '2nd Year' },
    { value: 3, label: '3rd Year' },
    { value: 4, label: '4th Year' },
];

export const POSITIONS = [
    'Student President',
    'Vice President',
    'General Secretary',
    'Cultural Secretary',
    'Sports Secretary',
    'Technical Secretary'
];

export const ELECTION_CONFIG = {
    name: 'Campus Elections 2026',
    startDate: '2026-02-01',
    endDate: '2026-02-10',
    resultsDate: '2026-02-11'
};

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        LOGOUT: '/auth/logout'
    },
    USERS: {
        ME: '/users/me',
        ALL: '/users'
    },
    CANDIDATES: {
        ALL: '/candidates',
        SINGLE: (id) => `/candidates/${id}`
    },
    VOTES: {
        CAST: '/votes',
        RESULTS: '/votes/results'
    }
};
