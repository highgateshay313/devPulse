
import { useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import {useLocalStorage } from '../hooks/useLocalStorage';
import { useGitHubUser } from '../hooks/useGitHubUser';
import { useGitHubRepos } from '../hooks/useGitHubRepos';
import { useGitHubActivity } from '../hooks/useGitHubActivity';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { UserCard } from '../components/UserCard/UserCard';
import { RepoList } from '../components/RepoList/RepoList';
import { LanguageChart } from '../components/LanguageChart/LanguageChart';
import { ActivityChart } from '../components/ActivityChart/ActivityChart';
import { ErrorMessage } from '../components/ErrorMessage/ErrorMessage';
import { UserCardInfo } from '../components/UserCard/UserCardInfo';
import styles from './Dashboard.module.css';

export default function Dashboard() {
    const [lastUser, setLastUser] = useLocalStorage('devpulse_last_user', '');
    const [query, setQuery] = useState(lastUser);
    const debouncedQuery = useDebounce(query, 600);

    const {user, loading: userLoading, error: userError} = useGitHubUser(debouncedQuery);
    const { repos, topRepos, languages, loading: repoLoading } = useGitHubRepos(debouncedQuery);
    const { chartData, loading: activityLoading} = useGitHubActivity(debouncedQuery);

    const handleSearch = (username) => {
        setQuery(username);
        setLastUser(username);
    };

    return (
        <div className={styles.page}>
            <header className={styles.header}> 
                <h1 className={styles.logo}>DevPulse</h1>
                <SearchBar onSearch={handleSearch} initialValue={lastUser}/>
            </header>

            {userError && <ErrorMessage message={userError}/>}

            { (query && !userError) && (
                <main className={styles.grid}>

                    <section className={styles.profile}>
                        <UserCard user={user} loading={userLoading} />
                    </section>

                    <section className={styles.info}>
                        <UserCardInfo user={user} loading={userLoading}/>
                    </section>

                    <section className={styles.activity}>
                        <ActivityChart chartData={chartData} loading={activityLoading} />
                    </section>
                    
                    <section className={styles.languages}>
                        <LanguageChart languages={languages}/>
                    </section>

                    <section className={styles.repos}>
                        <h2>Repositories</h2>
                        <RepoList repos={repos} loading={repoLoading}/>
                    </section>
                    
                </main>
            )}
        </div>
    )
}