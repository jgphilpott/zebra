# Zebra Dating App - Technical Documentation

## Overview
Zebra is a dating app designed to connect Black and White couples. The app operates on a simple principle: users are only paired with members of the opposite race and sex.

## Tech Stack

### Architecture
This project uses a **monorepo architecture** to maximize code reuse across platforms:

```
zebra/
├── packages/
│   ├── shared/     # Shared TypeScript types and business logic
│   ├── mobile/     # React Native + Expo app (iOS & Android)
│   └── web/        # Next.js web application
```

### Technologies

#### Shared Package (`@zebra/shared`)
- **TypeScript** - Type-safe shared code
- **Purpose**: Contains all business logic, types, and matching algorithms that are used by both web and mobile apps

#### Mobile App (`@zebra/mobile`)
- **React Native** - Cross-platform mobile framework
- **Expo** - Development and build tooling
- **React Navigation** - Navigation library
- **TypeScript** - Type safety
- **Platforms**: iOS and Android from a single codebase

#### Web App (`@zebra/web`)
- **Next.js 14** - React framework with SSR/SSG capabilities
- **React 18** - UI library
- **TypeScript** - Type safety
- **CSS Modules** - Scoped styling

## Core Concepts

### Matching Logic
The app implements Zebra's core concept through the shared matching logic:

```typescript
// Black women only see white men
// Black men only see white women
// White women only see black men
// White men only see black women
```

This is enforced by the `getMatchPreferences()` function in `packages/shared/src/matching.ts`.

### User Profile Structure
```typescript
interface UserProfile {
  id: string;
  name: string;
  age: number;
  race: Race;          // BLACK | WHITE
  gender: Gender;      // MALE | FEMALE
  bio?: string;
  photos?: string[];
  location?: { latitude: number; longitude: number; };
  createdAt: Date;
  updatedAt: Date;
}
```

## Project Structure

### Shared Package
```
packages/shared/
├── src/
│   ├── types.ts        # Core TypeScript types and interfaces
│   ├── matching.ts     # Matching algorithm and logic
│   └── index.ts        # Package exports
├── dist/               # Compiled JavaScript output
├── package.json
└── tsconfig.json
```

### Mobile App
```
packages/mobile/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.tsx        # Welcome/landing screen
│   │   ├── ProfileScreen.tsx     # Profile setup
│   │   └── MatchingScreen.tsx    # Swiping interface
│   └── components/               # Reusable UI components
├── assets/                       # Images and static files
├── App.tsx                       # Main app entry point
├── app.json                      # Expo configuration
└── package.json
```

### Web App
```
packages/web/
├── pages/
│   ├── index.tsx       # Home page
│   ├── profile.tsx     # Profile page
│   ├── matching.tsx    # Matching page
│   ├── _app.tsx        # Next.js app wrapper
│   └── _document.tsx   # HTML document structure
├── styles/             # CSS modules
├── components/         # Reusable React components
├── next.config.js      # Next.js configuration
└── package.json
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- For mobile development:
  - Expo CLI
  - iOS Simulator (macOS) or Android Studio

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jgphilpott/zebra.git
   cd zebra
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install all package dependencies
   npm run install-packages
   ```

3. **Build shared package**
   ```bash
   cd packages/shared
   npm run build
   ```

### Running the Apps

#### Web Application
```bash
# From root directory
npm run web

# Or from packages/web
cd packages/web
npm run dev
```
Access at: http://localhost:3000

#### Mobile Application
```bash
# From root directory
npm run mobile

# Or from packages/mobile
cd packages/mobile
npm start
```

Then:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app on your device

### Building for Production

#### Web
```bash
cd packages/web
npm run build
npm run start
```

#### Mobile
```bash
cd packages/mobile
# For iOS
expo build:ios

# For Android
expo build:android
```

## Development Workflow

### Adding New Features
1. **Shared Logic**: Add types and business logic to `packages/shared/src/`
2. **Build Shared**: Run `npm run build` in `packages/shared/`
3. **Update Apps**: Use the new types/functions in mobile and web apps

### Code Reuse Strategy
- **Types and Interfaces**: Defined once in `shared` package
- **Business Logic**: Matching algorithms, validation, etc. in `shared`
- **UI Components**: Platform-specific but follow same design patterns
- **State Management**: Can be added to shared package if needed

## Future Enhancements

### Backend Integration
Currently uses mock data. To add a backend:
1. Consider **Firebase** for:
   - Authentication (email, social login)
   - Cloud Firestore (user profiles, matches)
   - Cloud Storage (photos)
   - Push notifications

2. Alternative: **Custom API** with:
   - Node.js/Express or Next.js API routes
   - PostgreSQL or MongoDB
   - AWS S3 for photo storage

### Features to Add
- [ ] User authentication (email, social login)
- [ ] Real-time chat between matches
- [ ] Photo upload and management
- [ ] Location-based matching
- [ ] Push notifications for new matches
- [ ] User preferences and filters (age range, distance)
- [ ] Report and block functionality
- [ ] Admin dashboard
- [ ] Analytics and metrics

### Recommended Libraries
- **State Management**: Redux Toolkit or Zustand
- **Forms**: React Hook Form
- **API Calls**: React Query or SWR
- **Authentication**: Firebase Auth or NextAuth.js
- **Database**: Firebase Firestore or Supabase
- **Real-time**: Socket.io or Firebase Realtime Database
- **Testing**: Jest, React Testing Library, Detox (mobile E2E)

## Deployment

### Web App Deployment
Recommended platforms:
- **Vercel** (optimal for Next.js) - One-click deployment
- **Netlify** - Alternative with easy setup
- **AWS Amplify** - More control, integrates with AWS services

### Mobile App Deployment
1. **iOS**:
   - Apple Developer account required ($99/year)
   - Use Expo build service or EAS Build
   - Submit to App Store via App Store Connect

2. **Android**:
   - Google Play Developer account ($25 one-time)
   - Use Expo build service or EAS Build
   - Submit to Google Play Console

## Maintenance

### Keeping Dependencies Updated
```bash
# Check for updates
npm outdated

# Update packages
npm update

# Major updates
npx npm-check-updates -u
npm install
```

### Code Quality
Consider adding:
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks for pre-commit checks
- **TypeScript strict mode** - Already enabled

## Support and Contributing

For questions or contributions, please:
1. Open an issue on GitHub
2. Submit a pull request with detailed description
3. Follow existing code style and patterns

## License
MIT License - See LICENSE file for details
