
export function aggregateLanguages(repos) {
    const counts = {};

    repos.forEach(repo => {
        if (repo.language) counts[repo.language] = (counts[repo.language] || 0) + 1;
    });

    return Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([name, value]) => ({name, value}));
}