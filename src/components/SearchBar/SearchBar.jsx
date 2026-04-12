
import { useState, useRef } from 'react';
import styles from './SearchBar.module.css';

export function SearchBar({ onSearch, initialValue = ''}) {
    const [input, setInput] = useState(initialValue);
    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) onSearch(input.trim());
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input 
                ref={inputRef}
                className={styles.input}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Search a GitHub username..."
                aria-label="GitHub username search"
                autoComplete="off"
                spellCheck={false}
            />
            <button className={styles.button}>Search</button>
        </form>
    )
}