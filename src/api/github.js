
const BASE_URL = 'https://api.github.com';
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const headers = {
    Authorization: `Bearer ${TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
};

// Generic fetch wrapper with error handling
async function githubFetch(endpoint, signal) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {headers, signal});
    if (res.status === 404) throw new Error('User not found');
    if (res.status === 403) throw new Error('API rate limit exceeded');
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    return res.json();
}

export const getUser = (username, signal) => 
    githubFetch(`/users/${username}`, signal);

export const getRepos = (username, signal) =>
    githubFetch(`/users/${username}/repos?per_page=100&sort=updated`, signal);

export const getEvents = (username, signal) =>
    githubFetch(`/users/${username}/events/public?per_page=100`, signal);

export const getRateLimit = (signal) =>
    githubFetch('/rate_limit', signal);