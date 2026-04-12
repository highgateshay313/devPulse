
import {Skeleton} from '../Skeleton/Skeleton'
import styles from './UserCard.module.css'



export function UserCard({user, loading}) {
    if (loading) return (
        <div className={styles.card}>
            <Skeleton width="96px" height="96px" borderRadius="50%"/>
            <div className={styles.info}>
                <Skeleton width="200px" height="24px" />
                <Skeleton width="140px" height="16px" />
                <Skeleton width="100%" height="16px" />
            </div>
        </div>
    );

    if (!user) return null;

    return (
        <div className={styles.card}>
            <div className={styles.avatarRow}>
                <img src={user.avatar_url} alt={user.login} className={styles.avatar} />
                <div className={styles.nameGroup}>
                    <h2 className={styles.name}>{user.name || user.login}</h2>
                     <p className={styles.login}>@{user.login}</p>
                     
                    {user.location && <p className={styles.location}>{user.location}</p>}
                </div>
            </div>
        </div>
    );
}



