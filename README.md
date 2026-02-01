# 🦓 Zebra Dating App

A dating app designed to connect Black and White couples across racial lines.

## About

Zebra is a unique dating platform that facilitates meaningful connections between people of different races. The app operates on a simple principle:

- **Black women** are matched with **White men**
- **Black men** are matched with **White women**
- **White women** are matched with **Black men**
- **White men** are matched with **Black women**

## Features

✨ **Cross-Platform** - Web, iOS, and Android from a single codebase
🎯 **Smart Matching** - Automatic pairing based on race and gender preferences
💻 **Modern Tech Stack** - Built with React Native, Next.js, and TypeScript
📱 **Responsive Design** - Beautiful UI on all devices
🔒 **Privacy Focused** - User data protection and security

## Tech Stack

This project uses a **monorepo architecture** for maximum code reuse:

- **Shared Logic** (`packages/shared`): TypeScript types and matching algorithms
- **Mobile App** (`packages/mobile`): React Native + Expo for iOS & Android
- **Web App** (`packages/web`): Next.js for web platform

## Quick Start

### Prerequisites
- Node.js v18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/jgphilpott/zebra.git
cd zebra

# Install all dependencies
npm install
npm run install-packages

# Build shared package
cd packages/shared && npm run build && cd ../..
```

### Running the Apps

**Web Application:**
```bash
npm run web
# Opens at http://localhost:3000
```

**Mobile Application:**
```bash
npm run mobile
# Scan QR code with Expo Go app
```

## Project Structure

```
zebra/
├── packages/
│   ├── shared/     # Shared TypeScript code
│   ├── mobile/     # React Native mobile app
│   └── web/        # Next.js web app
├── package.json    # Root package configuration
└── README.md
```

## Documentation

For detailed technical documentation, architecture decisions, and development guides, see [TECHNICAL_DOCUMENTATION.md](./TECHNICAL_DOCUMENTATION.md).

## Development

The project is structured to maximize code reuse:

1. **Shared Package**: Contains all business logic, types, and matching algorithms
2. **Mobile Package**: React Native UI components and mobile-specific features
3. **Web Package**: Next.js pages and web-specific features

All core logic is shared between platforms, ensuring consistency and reducing duplication.

## Future Roadmap

- [ ] User authentication and registration
- [ ] Real-time chat between matches
- [ ] Photo upload and gallery
- [ ] Location-based matching
- [ ] Push notifications
- [ ] User preferences and filters
- [ ] Backend API integration (Firebase/custom)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see [LICENSE](./LICENSE) file for details

## Support

For questions or support, please open an issue on GitHub.
