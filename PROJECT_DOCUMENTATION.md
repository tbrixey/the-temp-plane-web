# The Temporary Plane - Project Documentation

## Overview

**The Temporary Plane** is a web-based role-playing game (RPG) built with Next.js. The project was created as a personal project by the developer but has been abandoned due to lack of time to continue development.

## Project Status

**Abandoned** - The developer no longer has time to continue development and has moved on from this project.

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Material UI (MUI)** - Component library
- **Emotion** - CSS-in-JS styling
- **D3.js** - Data visualization (for the player map)
- **SWR** - Data fetching
- **Next-Auth** - Authentication
- **Mixpanel** - Analytics tracking
- **React Device Detect** - Device detection for responsive design

### Backend
- **Next.js API Routes** - Server-side API
- **Firebase** - Backend infrastructure
- **Axios** - HTTP client

### Package Manager
- **pnpm** - Fast, disk space efficient package manager

## Project Structure

```
the-temp-plane-web/
├── components/          # React components
│   ├── meta.tsx        # Meta tags component
│   └── newPlayerSetup.tsx  # New player character creation
├── pages/              # Next.js pages
│   ├── _app.tsx        # Custom app wrapper
│   ├── index.tsx       # Landing page with player map
│   ├── auth/
│   │   └── signin.tsx  # Sign in page
│   ├── register.tsx    # Registration page
│   └── game/
│       ├── index.tsx   # Main game dashboard
│       ├── travel.tsx  # Travel mechanics
│       ├── quests.tsx  # Quest system
│       └── skilling.tsx # Skill system (disabled)
├── styles/             # CSS modules
│   ├── Home.module.css
│   ├── Game.module.css
│   └── Standard.module.css
├── types/              # TypeScript type definitions
│   ├── user.ts
│   ├── location.ts
│   ├── quest.ts
│   ├── classes.ts
│   ├── races.ts
│   ├── items.ts
│   └── next-auth.d.ts
├── util/               # Utility functions
│   ├── userContext.ts
│   ├── useGetUsers.ts
│   ├── useGetStarting.ts
│   └── getUserToken.ts
├── public/             # Static assets
└── firebase.json       # Firebase configuration
```

## Core Features

### 1. Landing Page (`/`)
- Hero section with project description
- Live player map showing user locations (D3.js visualization)
- Discord and Patreon support links
- How to play section
- FAQ section with Trello roadmap link
- Social media links (Twitter, Discord)

### 2. Authentication
- Sign in with Next-Auth
- User registration
- API key generation for external integrations

### 3. Game Dashboard (`/game`)
- Player profile display (name, level, hitpoints)
- Character creation (race, class selection)
- Main navigation:
  - **Travel** - Move between locations
  - **Quests** - Accept and complete quests
  - **Skilling** - Skill progression (currently disabled)

### 4. Character System
- **Races** - Character race selection
- **Classes** - Character class selection
- **Stats** - STR, DEX, CON, INT, LUCK
- **Skills** - Mining, Woodcutting, Arcana, Cooking, Gathering
- **Inventory** - Items with effects and values
- **Leveling** - XP system with level progression

### 5. Quest System
- Quest types:
  - `intro` - Tutorial quests
  - `fetch` - Fetch items
  - `explore` - Explore locations
  - `fight` - Combat quests
- Quest rewards:
  - Gold
  - XP
  - Items

### 6. Location System
- Multiple game locations with coordinates
- Population tracking
- Travel mechanics between locations

### 7. Analytics
- Mixpanel integration for tracking user behavior
- Landing page view tracking

## API Structure

The game uses a separate API backend with basic authentication via API keys. The frontend communicates with the API using:

- Authorization header with Bearer token
- Axios for HTTP requests
- SWR for data fetching and caching

## Key Dependencies

### Core
- `next@^15.1.4` - React framework
- `react@^18.3.1` - UI library
- `@mui/material@^5.16.0` - Material UI components
- `@emotion/react@^11.11.6` - Emotion styling
- `@emotion/styled@^11.11.6`

### Utilities
- `axios@^1.7.9` - HTTP client
- `d3@^7.9.0` - Data visualization
- `lodash@^4.17.21` - Utility functions
- `swr@^2.2.5` - Data fetching
- `next-auth@^5.0.0-beta.25` - Authentication

### Analytics
- `mixpanel-browser@^2.54.0` - Analytics tracking
- `copy-to-clipboard@^3.3.3` - Clipboard operations

### Device Detection
- `react-device-detect@^2.2.3` - Device detection for responsive design

## Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run build-export # Build and export static files
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Project Philosophy

The Temporary Plane is designed as an open, web-based game where:

1. The game runs purely on a web API
2. Players can build their own web portals or mobile applications
3. Automation scripts can be written to play characters
4. The game space is ever-changing and growing

## External Links

- **Discord**: https://discord.gg/6YAyH86TAa
- **Patreon**: https://www.patreon.com/TheTemporaryPlane
- **Twitter**: https://twitter.com/TheTempPlane
- **Trello Roadmap**: https://trello.com/b/tIEjLUYM/the-temporary-plane
- **Developer Website**: https://trevorbrixey.com

## Notes

- The project is in **ALPHA stage**
- Documentation is not yet available
- The game is designed to be API-first, allowing external integrations
- The developer has moved on from this project