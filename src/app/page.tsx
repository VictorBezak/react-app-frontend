import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.counter}>
        <span>Count: _</span>
        <div>
          <button>+</button>
          <button>-</button>
        </div>
      </div>
    </main>
  )
}
