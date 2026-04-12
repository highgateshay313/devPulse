
import { useState, useEffect, useMemo } from 'react';
import { getEvents } from '../api/github';

export function useGitHubActivity(username) {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!username.trim()) return;
        const controller = new AbortController();
        setLoading(true);

        getEvents(username, controller.signal)
            .then(data => setEvents(data))
            .catch(err => { if (err.name !== 'AbortError') setError(err.message)})
            .finally(() => setLoading(false))

        return () => controller.abort();
    }, [username]);

    //Transform event into weely buckets for the chart
    const chartData = useMemo(() => {
        const weeks = {};
        events.forEach(event => {
            const week = event.created_at.slice(0, 10);
            weeks[week] = (weeks[week] || 0) + 1;
        });
        return Object.entries(weeks)
            .map(([date, count]) => ({ date, count }))
            .sort((a, b) => a.date.localeCompare(b.date));
    }, [events]);

    return { chartData, loading, error };
}