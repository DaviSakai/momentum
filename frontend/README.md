# Momentum — Frontend

This is a [Next.js](https://nextjs.org) project bootstrapped with `create-next-app`, utilizing the App Router.

## Architecture

- **Framework:** Next.js 15+ (React 19)
- **Styling:** Vanilla CSS (CSS Modules & Global Variables)
- **API Communication:** Custom API client wrapper (`src/services/api.js`) pointing to the Express backend.
- **Routing:** App Router (`app/` directory)

## Getting Started

First, ensure the backend is running. Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Copy `.env.example` to `.env.local` and configure your local variables:

```bash
cp .env.example .env.local
```

Required variables:
- `NEXT_PUBLIC_API_URL`: URL of the Express backend (default: `http://localhost:3001/api`)

## Project Structure

- `app/`: Next.js App Router pages and layouts.
- `src/components/`: Shared UI components (buttons, cards, inputs).
- `src/features/`: Feature-specific components grouped by domain (auth, dashboard, goals, etc.).
- `src/services/`: API clients and external service integrations.
- `src/hooks/`: Reusable React hooks.
- `src/lib/`: Utility functions and formatters.
- `src/styles/`: Additional CSS modules and variables.
