'use client';
import styles from './Counter.module.scss'
import { MutableRefObject, useRef, useState } from 'react';

export default function Counter() {
    const [count, setCount] = useState(0);
    const [flash, setFlash] = useState(false);

    const singleIncrement = () => setCount(count + 1);
    const singleDecrement = () => setCount(count - 1);

    let timeoutId: MutableRefObject<NodeJS.Timeout | null> = useRef(null);
    let intervalId: MutableRefObject<NodeJS.Timer | null> = useRef(null);

    const startIncrementing = () => {
        singleIncrement();

        timeoutId.current = setTimeout(() => {
            intervalId.current = setInterval(() => {
                setCount(prevCount => prevCount + 1);
            }, 50);
        }, 500);
    };

    const startDecrementing = () => {
        singleDecrement();

        timeoutId.current = setTimeout(() => {
            intervalId.current = setInterval(() => {
                setCount(prevCount => prevCount - 1);
            }, 50);
        }, 500);
    };

    const stopChanging = () => {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
            timeoutId.current = null;
        }
        if (intervalId.current) {
            clearInterval(intervalId.current);
            intervalId.current = null;
        }
    };

    const resetCount = () => {
        if (flash) setFlash(false); // If animation is still running, stop it

        setCount(0);
        setFlash(true);
        setTimeout(() => setFlash(false), 200); // Remove flash state after 200ms, which is the animation duration
    }

    return (
        <div className={`${styles.counter} ${flash ? styles.flash : ''}`}>
            <span className={styles.label}>{count}</span>
            <div className={styles.buttons}>
                <button onMouseDown={startDecrementing} onMouseUp={stopChanging} onMouseLeave={stopChanging}>-</button>
                <button onMouseDown={startIncrementing} onMouseUp={stopChanging} onMouseLeave={stopChanging}>+</button>
                <button className={styles.reset} onClick={resetCount}>Reset</button>
            </div>
        </div>
    );
}
