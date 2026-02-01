import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Race, Gender, UserProfile, getMatchPreferences } from '@zebra/shared';

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

export default function MatchingScreen() {
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

  if (!currentMatch) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No more matches available at this time
          </Text>
          <Text style={styles.emptySubtext}>
            Check back later for new potential matches!
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              As a {currentUser.race.toLowerCase()}{' '}
              {currentUser.gender.toLowerCase()}, you will see{' '}
              {preferences.targetRace.toLowerCase()}{' '}
              {preferences.targetGender.toLowerCase()}s
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.photoPlaceholder}>
              <Text style={styles.photoText}>📷</Text>
            </View>

            <View style={styles.profileInfo}>
              <Text style={styles.name}>
                {currentMatch.name}, {currentMatch.age}
              </Text>
              <Text style={styles.bio}>{currentMatch.bio}</Text>
              <View style={styles.tags}>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{currentMatch.race}</Text>
                </View>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{currentMatch.gender}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.passButton} onPress={handlePass}>
              <Text style={styles.passButtonText}>✕ Pass</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.likeButton} onPress={handleLike}>
              <Text style={styles.likeButtonText}>♥ Like</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.counter}>
            {currentIndex + 1} of {potentialMatches.length}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  infoBox: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  photoPlaceholder: {
    height: 400,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoText: {
    fontSize: 80,
  },
  profileInfo: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  tags: {
    flexDirection: 'row',
    gap: 10,
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    color: '#555',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    gap: 20,
  },
  passButton: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  passButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
  },
  likeButton: {
    flex: 1,
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  likeButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  counter: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    color: '#999',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
