
import styles from './UserCard.module.css'

export function UserCardInfo({user}) {

    if (!user) return null

    return (
          <div className={styles.bottomRow}>
            <div className={styles.stats}>
                <StatPill label="Repos" value={user.public_repos} />
                <StatPill label="Followers" value={user.followers} />
                <StatPill label="Following" value={user.following} />
            </div>
            <div className={styles.bio}>
                <h3 className={styles.bioTitle}>Bio</h3>
                {user.bio && <p className={styles.bio}>{user.bio}</p>}
            </div>
        </div>
    )
}

function StatPill({label, value}) {
    return (
        <div className={styles.pill}>
            <span className={styles.pillValue}>{value.toLocaleString()}</span>
            <span className={styles.pillLabel}>{label}</span>
        </div>
    )
}