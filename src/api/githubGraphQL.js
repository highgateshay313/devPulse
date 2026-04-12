
const GRAPHQL_URL = 'https://api.github.com/graphql';
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const PINNED_REPOS_QUERY = `
    query PinnedRepos($login: String!) {
        pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
                ... on Repository {
                    name
                    description
                    url
                    stargazersCount
                    forkCount
                    primaryLanguage { name color }
                }
            }
        }
    }
`;

export async function getPinnedRepos(username, signal) {
    const res = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: PINNED_REPOS_QUERY, variables: { login: username }}),
            signal,
    });
    const { data, errors } = await res.json();
    if (errors) throw new Error(errors[0].message);
    return data.user.pinnedItems.nodes;
}