
import { useState, useEffect, useMemo } from 'react';
import { getRepos } from '../api/github';
import { aggregateLanguages } from '../utils/aggregators';

export function useGitHubRepos(username) {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    useEffect(() => {
        if(!username.trim()) return;

        const controller = new AbortController();
        setLoading(true);
        setError(null);

        getRepos(username, controller.signal)
            .then(data => setRepos(data))
            .catch(err => {
                if(err.name !== 'AbortError') setError(err.message);
            })
            .finally(() => setLoading(false));

    return () => controller.abort();
    }, [username]);

    //Derived - computed from repos, not stored in seperate state
    const languages = useMemo(() => aggregateLanguages(repos), [repos]);
    const topRepos = useMemo(() => 
    [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6)
    , [repos]);

    return { repos, topRepos, languages, loading, error }
}