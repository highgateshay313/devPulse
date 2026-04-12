
import { useState, useEffect } from 'react';
import { getUser } from '../api/github';

export function useGitHubUser(username) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!username.trim()) return;

        const controller = new AbortController();
        setLoading(true);
        setError(null);
        setUser(null);

        getUser(username, controller.signal)
        .then(data => {
            setUser(data)
        })
        .catch(err => {
                if (err.name !== 'AbortError') setError(err.message);
            })
        .finally(() => setLoading(false));
           return () => controller.abort();
    }, [username]);
    return {user, loading, error}
}