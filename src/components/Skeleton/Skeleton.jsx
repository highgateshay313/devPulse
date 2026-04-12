
import styles from './Skeleton.module.css';

export  function Skeleton({width = '100%', height = '16px', borderRadius = '6px'}) {
    return (
        <div 
            className={styles.skeleton}
            style={{width, height, borderRadius}}
            aria-hidden="true"    
        >

            </div>
    )
}