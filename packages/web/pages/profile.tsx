import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Race, Gender } from '@zebra/shared';
import styles from '@/styles/Profile.module.css';

export default function Profile() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [race, setRace] = useState<Race | null>(null);
  const [gender, setGender] = useState<Gender | null>(null);
  const [bio, setBio] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !age || !race || !gender) {
      alert('Please fill in all required fields');
      return;
    }
    alert('Profile saved successfully!');
  };

  return (
    <>
      <Head>
        <title>Profile - Zebra</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <Link href="/" className={styles.backLink}>← Back to Home</Link>
          
          <h1 className={styles.title}>Your Profile</h1>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Age *</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter your age"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Race *</label>
              <div className={styles.optionContainer}>
                <button
                  type="button"
                  className={`${styles.optionButton} ${race === Race.BLACK ? styles.selected : ''}`}
                  onClick={() => setRace(Race.BLACK)}
                >
                  Black
                </button>
                <button
                  type="button"
                  className={`${styles.optionButton} ${race === Race.WHITE ? styles.selected : ''}`}
                  onClick={() => setRace(Race.WHITE)}
                >
                  White
                </button>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Gender *</label>
              <div className={styles.optionContainer}>
                <button
                  type="button"
                  className={`${styles.optionButton} ${gender === Gender.MALE ? styles.selected : ''}`}
                  onClick={() => setGender(Gender.MALE)}
                >
                  Male
                </button>
                <button
                  type="button"
                  className={`${styles.optionButton} ${gender === Gender.FEMALE ? styles.selected : ''}`}
                  onClick={() => setGender(Gender.FEMALE)}
                >
                  Female
                </button>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself..."
                className={styles.textarea}
                rows={4}
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              Save Profile
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
