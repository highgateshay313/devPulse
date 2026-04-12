
import { useState, useMemo } from 'react';
import { RepoCard } from '../RepoCard/RepoCard';
import { Skeleton } from '../Skeleton/Skeleton';
import styles from './RepoList.module.css';

const SORT_OPTIONS = [
    {value: 'stars', label: 'Most Stars'},
    {value: 'forks', label: 'Most Forks'},
    {value: 'updated', label: 'Recently Updated'},
];

export function RepoList({ repos, loading }) {
    const [sort, setSort] = useState('stars');
    const [langFilter, setLangFilter] = useState('All');

    const languages = useMemo(() => {
        const langs = [...new Set(repos.map(r => r.language).filter(Boolean))];
        return ['All', ...langs.sort()];
    }, [repos]);

    const filtered = useMemo(() => {
        let list = langFilter === 'All' ? repos : repos.filter(r => r.language === langFilter);
        
        if (sort === 'stars') list = [...list]
        .sort((a, b) => b.stargazers_count - a.stargazers_count);

        if (sort === 'forks') list = [...list]
        .sort((a, b) => b.forks_count - a.forks_count);

        if (sort === 'updated') list = [...list]
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        return list;
    }, [repos, sort, langFilter]);

    if (loading) return <div className={styles.grid}>{
        Array.from({ length: 6}).map((_,i) => (
            <Skeleton key={i} height="120px" borderRadius="10px"/>
        ))
        
    }</div>;

    return (
        <div className={styles.listItems}>
        <div className={styles.controls}>
            <select className={styles.select} value={sort} onChange={e => setSort(e.target.value)}>
                {SORT_OPTIONS.map(o => <option key={o.value}
                value={o.value}>{o.label}</option>)}
            </select>
            <select className={styles.select} value={langFilter} onChange={e => setLangFilter(e.target.value)}>
                {languages.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
        </div>
        <div className={styles.grid}>
            {filtered.map(repo => <RepoCard key={repo.id} repo={repo}/>)}
        </div>
    </div>
);
}