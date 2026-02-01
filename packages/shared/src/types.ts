/**
 * User race enum
 */
export enum Race {
  BLACK = 'BLACK',
  WHITE = 'WHITE'
}

/**
 * User gender enum
 */
export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

/**
 * User profile interface
 */
export interface UserProfile {
  id: string;
  name: string;
  age: number;
  race: Race;
  gender: Gender;
  bio?: string;
  photos?: string[];
  location?: {
    latitude: number;
    longitude: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Match interface representing a connection between two users
 */
export interface Match {
  id: string;
  user1Id: string;
  user2Id: string;
  createdAt: Date;
  status: 'pending' | 'accepted' | 'rejected';
}

/**
 * Match preferences based on Zebra's core concept
 */
export interface MatchPreferences {
  targetRace: Race;
  targetGender: Gender;
}
