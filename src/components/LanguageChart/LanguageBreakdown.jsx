
import styles from './LanguageBreakdown.module.css';

const COLORS = [
    '#7C3AED',
    '#A78BFA',
    '#2563EB',
    '#38BDF8',
    '#059669',
    '#34D399',
    '#D97706',
    '#FB923c',
];

export function LanguageBreakdown({ languages }) {
    if (!languages.length) return null;

    const total = languages.reduce((sum, lang) => sum + lang.value, 0);

    return (
        <div className={styles.container}>
            {languages.map((lang, i) => {
                const pct = Math.round((lang.value / total) * 100);
                return (
                    <div key={lang.name} className={styles.item}>
                        <div 
                            className={styles.dot}
                            style={{background: COLORS[i % COLORS.length]}}
                        />
                        <span className={styles.name}>{lang.name}</span>
                        <span className={styles.pct}>{pct}%</span>
                    </div>
                )
            })}
        </div>
    )
}