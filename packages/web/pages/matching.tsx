import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Race, Gender, UserProfile, getMatchPreferences } from '@zebra/shared';
import styles from '@/styles/Matching.module.css';

// Mock data for demonstration
const mockUsers: UserProfile[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    age: 28,
    race: Race.WHITE,
    gender: Gender.FEMALE,
    bio: 'Love hiking and good conversations',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Marcus Williams',
    age: 32,
    race: Race.BLACK,
    gender: Gender.MALE,
    bio: 'Entrepreneur and foodie',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Emily Chen',
    age: 26,
    race: Race.WHITE,
    gender: Gender.FEMALE,
    bio: 'Artist and traveler',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    name: 'David Thompson',
    age: 30,
    race: Race.BLACK,
    gender: Gender.MALE,
    bio: 'Software engineer who loves music',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function Matching() {
  // For demo purposes, using a black male profile
  const [currentUser] = useState<UserProfile>({
    id: 'current',
    name: 'You',
    age: 28,
    race: Race.BLACK,
    gender: Gender.MALE,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  // Get matching preferences
  const preferences = getMatchPreferences(currentUser);

  // Filter potential matches
  const potentialMatches = mockUsers.filter(
    user =>
      user.race === preferences.targetRace &&
      user.gender === preferences.targetGender
  );

  const currentMatch = potentialMatches[currentIndex];

  const handleLike = () => {
    if (currentIndex < potentialMatches.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePass = () => {
    if (currentIndex < potentialMatches.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <>
      <Head>
        <title>Matching - Zebra</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <Link href="/" className={styles.backLink}>← Back to Home</Link>
          
          <h1 className={styles.title}>Find Your Match</h1>

          <div className={styles.infoBox}>
            <p>
              As a {currentUser.race.toLowerCase()}{' '}
              {currentUser.gender.toLowerCase()}, you will see{' '}
              {preferences.targetRace.toLowerCase()}{' '}
              {preferences.targetGender.toLowerCase()}s
            </p>
          </div>

          {currentMatch ? (
            <>
              <div className={styles.card}>
                <div className={styles.photoPlaceholder}>
                  <span className={styles.photoIcon}>📷</span>
                </div>

                <div className={styles.profileInfo}>
                  <h2 className={styles.name}>
                    {currentMatch.name}, {currentMatch.age}
                  </h2>
                  <p className={styles.bio}>{currentMatch.bio}</p>
                  <div className={styles.tags}>
                    <span className={styles.tag}>{currentMatch.race}</span>
                    <span className={styles.tag}>{currentMatch.gender}</span>
                  </div>
                </div>
              </div>

              <div className={styles.actions}>
                <button className={styles.passButton} onClick={handlePass}>
                  ✕ Pass
                </button>
                <button className={styles.likeButton} onClick={handleLike}>
                  ♥ Like
                </button>
              </div>

              <p className={styles.counter}>
                {currentIndex + 1} of {potentialMatches.length}
              </p>
            </>
          ) : (
            <div className={styles.emptyState}>
              <h2>No more matches available</h2>
              <p>Check back later for new potential matches!</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
