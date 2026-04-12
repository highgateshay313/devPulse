
import styles from './ErrorMessage.module.css';

export function ErrorMessage({ message }) {
    return (
        <div className={styles.container}>
            <span className={styles.icon}>!</span>
        <div className={styles.content}>
            <p className={styles.title}>Something went wrong!</p>
            <p className={styles.message}>{message}</p>
        </div>
        </div>
    )
}