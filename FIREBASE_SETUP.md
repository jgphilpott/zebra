# Firebase Configuration Template

## Setting Up Firebase

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Name it "Zebra Dating"
4. Enable Google Analytics (optional)
5. Create project

### Step 2: Enable Services

#### Authentication
1. Go to Authentication → Sign-in method
2. Enable Email/Password
3. Optional: Enable Google, Facebook, Apple sign-in

#### Firestore Database
1. Go to Firestore Database
2. Create database
3. Start in production mode
4. Choose location closest to users

#### Storage
1. Go to Storage
2. Get started
3. Use default security rules (update later)

### Step 3: Register Apps

#### Web App
1. Go to Project Settings → General
2. Click "Add app" → Web
3. Name: "Zebra Web"
4. Register app
5. Copy configuration

#### iOS App
1. Click "Add app" → iOS
2. iOS bundle ID: `com.zebra.dating`
3. Download `GoogleService-Info.plist`

#### Android App
1. Click "Add app" → Android
2. Android package name: `com.zebra.dating`
3. Download `google-services.json`

## Configuration Files

### For Web App (`packages/web/.env.local`)

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### For Mobile App (`packages/mobile/.env`)

```env
# Same configuration as web
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key_here
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Firebase Initialization (packages/shared/src/firebase.ts)

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

## Firestore Data Structure

### Users Collection

```javascript
// users/{userId}
{
  id: "string",
  email: "string",
  name: "string",
  age: number,
  race: "BLACK" | "WHITE",
  gender: "MALE" | "FEMALE",
  bio: "string",
  photos: ["url1", "url2"],
  location: {
    latitude: number,
    longitude: number
  },
  createdAt: Timestamp,
  updatedAt: Timestamp,
  lastActive: Timestamp
}
```

### Matches Collection

```javascript
// matches/{matchId}
{
  id: "string",
  user1Id: "string",
  user2Id: "string",
  status: "pending" | "accepted" | "rejected",
  user1Action: "like" | "pass" | null,
  user2Action: "like" | "pass" | null,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Messages Collection

```javascript
// messages/{messageId}
{
  id: "string",
  matchId: "string",
  senderId: "string",
  receiverId: "string",
  text: "string",
  createdAt: Timestamp,
  read: boolean
}
```

## Security Rules

### Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own profile
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can read matches they're part of
    match /matches/{matchId} {
      allow read: if request.auth != null && 
        (resource.data.user1Id == request.auth.uid || 
         resource.data.user2Id == request.auth.uid);
      allow create: if request.auth != null;
      allow update: if request.auth != null && 
        (resource.data.user1Id == request.auth.uid || 
         resource.data.user2Id == request.auth.uid);
    }
    
    // Users can read/write messages in their matches
    match /messages/{messageId} {
      allow read: if request.auth != null && 
        (resource.data.senderId == request.auth.uid || 
         resource.data.receiverId == request.auth.uid);
      allow create: if request.auth != null && 
        request.resource.data.senderId == request.auth.uid;
    }
  }
}
```

### Storage Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/{allPaths=**} {
      // Users can only upload to their own folder
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Installing Firebase SDKs

### Shared Package

```bash
cd packages/shared
npm install firebase
```

### Web Package

```bash
cd packages/web
npm install firebase
```

### Mobile Package

```bash
cd packages/mobile
npm install firebase
expo install expo-firebase-core
```

## Usage Example

### Authentication Service (packages/shared/src/auth.ts)

```typescript
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut 
} from 'firebase/auth';
import { auth } from './firebase';

export const signIn = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signUp = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signOut = async () => {
  return await firebaseSignOut(auth);
};
```

### User Service (packages/shared/src/userService.ts)

```typescript
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { UserProfile } from './types';

export const createUserProfile = async (userId: string, profile: Partial<UserProfile>) => {
  const userRef = doc(db, 'users', userId);
  await setDoc(userRef, {
    ...profile,
    id: userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    return userSnap.data() as UserProfile;
  }
  return null;
};

export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    ...updates,
    updatedAt: new Date(),
  });
};
```

## Environment Variables Setup

### Development

1. Create `.env.local` in `packages/web/`
2. Create `.env` in `packages/mobile/`
3. Add both files to `.gitignore` (already done)
4. Never commit these files to version control

### Production

- **Vercel (Web)**: Add environment variables in project settings
- **Expo (Mobile)**: Use EAS Secrets or environment variables in build

## Testing Firebase Integration

```bash
# Web
cd packages/web
npm run dev
# Test auth and database operations

# Mobile
cd packages/mobile
npm start
# Test on device or simulator
```

## Important Notes

1. **API Keys**: Firebase API keys are safe to expose in client-side code. They identify your Firebase project.
2. **Security**: Real security comes from Firestore and Storage rules, not hiding API keys.
3. **Costs**: Monitor usage in Firebase Console to avoid unexpected charges.
4. **Backups**: Enable daily backups in Firestore settings.
5. **Indexes**: Create composite indexes as needed (Firebase will prompt you).

## Next Steps After Setup

1. Implement authentication UI
2. Create user onboarding flow
3. Build matching algorithm with Firestore queries
4. Add real-time listeners for matches
5. Implement chat functionality
6. Add photo upload
7. Setup push notifications
