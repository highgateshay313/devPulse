
import styles from './RepoCard.module.css'

export function RepoCard({repo}) {

     

    return (
        <div className={styles.links}>
             <a href={repo.html_url} target="_blank" rel="noreferrer" className={styles.card}>
            <h3 className={styles.name}>{repo.name}</h3>
            {repo.description && <p className={styles.desc}>{repo.description}</p>}
            <div className={styles.meta}>
                {repo.language && (
                    <span className={styles.lang}>{repo.language}</span>
                )}
                <span className={styles.stat}>⭐ {repo.stargazers_count}</span>
                <span className={styles.stat}>{repo.forks_count}</span>
            </div>
        </a>
        </div>
      
    );         
}