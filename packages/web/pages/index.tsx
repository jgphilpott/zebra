import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Zebra - Dating App for Black and White Couples</title>
        <meta name="description" content="Where Black and White Hearts Meet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>🦓 Zebra</h1>
          <p className={styles.subtitle}>Where Black and White Hearts Meet</p>

          <div className={styles.buttonContainer}>
            <Link href="/profile" className={styles.button}>
              Setup Profile
            </Link>
            <Link href="/matching" className={`${styles.button} ${styles.primaryButton}`}>
              Start Matching
            </Link>
          </div>

          <div className={styles.infoBox}>
            <p className={styles.infoTitle}>
              Zebra connects people across racial lines:
            </p>
            <ul className={styles.bulletList}>
              <li>Black women ↔ White men</li>
              <li>Black men ↔ White women</li>
              <li>White women ↔ Black men</li>
              <li>White men ↔ Black women</li>
            </ul>
          </div>

          <div className={styles.downloadSection}>
            <h2>Get the Mobile App</h2>
            <div className={styles.appButtons}>
              <button className={styles.appButton}>📱 Download for iOS</button>
              <button className={styles.appButton}>🤖 Download for Android</button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
