# Bugify – Frontend

Next.js + Tailwind CSS frontend for the DevPulse issue tracker.

## Pages

| Route | Description | Access |
|---|---|---|
| `/auth/login` | Sign in | Public |
| `/auth/signup` | Create account | Public |
| `/dashboard` | Stats & charts overview | Authenticated |
| `/issues` | Issues list with filters | Authenticated |
| `/issues/create` | Create new issue | Authenticated |
| `/issues/:id` | Issue detail | Authenticated |
| `/issues/:id/edit` | Edit issue | Authenticated (with permissions) |
| `/profile` | View account info | Authenticated |

## Setup

```bash
npm install
npm run dev   # runs on http://localhost:3001
```

Make sure the backend is running on `http://localhost:5000`.
The Next.js proxy in `next.config.mjs` forwards all `/api/*` requests to the backend automatically.
