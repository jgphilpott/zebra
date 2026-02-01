import { UserProfile, Race, Gender, MatchPreferences } from './types';

/**
 * Determines the matching preferences for a user based on Zebra's concept:
 * - Black women only see white men
 * - Black men only see white women
 * - White women only see black men
 * - White men only see black women
 */
export function getMatchPreferences(user: UserProfile): MatchPreferences {
  // The target race is always the opposite of the user's race
  const targetRace = user.race === Race.BLACK ? Race.WHITE : Race.BLACK;
  
  // The target gender is always the opposite of the user's gender
  const targetGender = user.gender === Gender.MALE ? Gender.FEMALE : Gender.MALE;
  
  return {
    targetRace,
    targetGender
  };
}

/**
 * Checks if two users are compatible for matching based on Zebra's rules
 */
export function areUsersCompatible(user1: UserProfile, user2: UserProfile): boolean {
  // Users must be of opposite race
  const oppositeRace = user1.race !== user2.race;
  
  // Users must be of opposite gender
  const oppositeGender = user1.gender !== user2.gender;
  
  return oppositeRace && oppositeGender;
}

/**
 * Filters a list of potential matches based on user's preferences
 */
export function filterPotentialMatches(
  currentUser: UserProfile,
  potentialMatches: UserProfile[]
): UserProfile[] {
  const preferences = getMatchPreferences(currentUser);
  
  return potentialMatches.filter(user => 
    user.id !== currentUser.id &&
    user.race === preferences.targetRace &&
    user.gender === preferences.targetGender
  );
}
