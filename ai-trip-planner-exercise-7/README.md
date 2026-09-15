# AI Trip Planner

An AI-powered travel planning app. Tell it where you want to go, and a conversational agent asks the right follow-up questions (starting point, group size, budget, trip length, interests) before generating a complete day-by-day itinerary — hotel picks, activities, and real photos for each place — plotted on an interactive 3D globe.

Built with the Next.js App Router, Convex, Clerk, Mapbox, and the OpenAI API.

## Features

- **Conversational trip builder** — a chat interface collects trip details one question at a time and renders purpose-built UI (budget, group size, day count) inline with the conversation, with assistant replies rendered as formatted Markdown (headings, lists, bold/italic) instead of raw text.
- **AI-generated itineraries** — once all details are collected, the planner produces a structured day-by-day plan with hotel recommendations, activities, ticket pricing, and best times to visit.
- **Interactive globe map** — every hotel and activity is plotted with a marker on a Mapbox 3D globe, with a one-click toggle between the map view and the itinerary view.
- **Real destination photography** — hotel and place images are resolved through Pexels and Wikimedia Commons (with relevance and licensing checks), never generic stock placeholders.
- **My Trips dashboard** — every generated plan is saved and browsable from a personal trips list, each opening into a full itinerary view.
- **Authentication & per-user data isolation** — sign-in/sign-up handled by Clerk, with a Clerk↔Convex JWT integration so every trip and profile record is scoped to its authenticated owner at the database level, plan-based access checks for premium usage.
- **Rate limiting & bot protection** — Arcjet guards the AI generation endpoint with a token bucket, so anonymous abuse doesn't burn through API credits.
- **Responsive UI** — polished layouts across mobile, tablet, and desktop, built with Tailwind CSS and shadcn/ui.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org) (App Router) + React 19 |
| Styling | Tailwind CSS v4, shadcn/ui, Tabler & Lucide icons |
| Content rendering | react-markdown + remark-gfm (GitHub-flavored Markdown) |
| Auth | [Clerk](https://clerk.com) |
| Database | [Convex](https://convex.dev) |
| AI | OpenAI Chat Completions API |
| Maps | [Mapbox GL JS](https://www.mapbox.com) |
| Images | Pexels API, Wikimedia Commons API |
| Bot/rate-limit protection | [Arcjet](https://arcjet.com) |

## Project Structure

```
app/
├── page.tsx                  # Landing page
├── create-new-trip/          # Chat-driven trip creation flow + globe map
├── my-trips/                 # Saved trips dashboard
├── view-trip/[tripid]/       # Single trip itinerary + map view
├── pricing/                  # Pricing / plans page
├── api/
│   ├── aimodel/               # OpenAI itinerary generation endpoint
│   └── hotel-image/           # Pexels/Wikimedia image resolution endpoint
├── _components/               # Shared layout components (Header, Hero, Footer)
└── Provider.tsx               # Convex, user, and trip-detail context providers

components/ui/
└── markdown-renderer.tsx       # Styled Markdown renderer used for AI chat replies

convex/
├── schema.ts                  # Database schema (users, trip details)
├── auth.config.ts             # Clerk JWT issuer configuration
├── user.ts                    # User queries/mutations
└── tripDetail.ts               # Trip queries/mutations (ownership-checked server-side)

lib/
└── arcjet.ts                  # Shared Arcjet rate-limiter instance
```

## Getting Started

### Prerequisites

- Node.js 20+
- Accounts/API keys for: [Clerk](https://clerk.com), [Convex](https://convex.dev), [OpenAI](https://platform.openai.com), [Arcjet](https://arcjet.com), [Pexels](https://www.pexels.com/api/), [Mapbox](https://www.mapbox.com)

### Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env.local` file in the project root with the following variables:

   ```bash
   # Convex
   CONVEX_DEPLOYMENT=
   NEXT_PUBLIC_CONVEX_URL=
   NEXT_PUBLIC_CONVEX_SITE_URL=

   # Clerk
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
   NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

   # OpenAI
   OPENAI_API_KEY=

   # Arcjet
   ARCJET_KEY=
   ARCJET_ENV=development

   # Image search
   PEXELS_API_KEY=

   # Maps
   NEXT_PUBLIC_MAPBOX_API_KEY=
   ```

3. Connect Clerk to Convex so trip and profile data is properly scoped per user:

   - In the Clerk dashboard, go to **Configure → JWT Templates → New template**, choose the **Convex** preset (or name it exactly `convex`), and save.
   - Copy the **Issuer** URL shown on that template.
   - Set it on your Convex deployment:

     ```bash
     npx convex env set CLERK_JWT_ISSUER_DOMAIN <issuer-url>
     ```

4. Start the Convex dev deployment (in a separate terminal):

   ```bash
   npx convex dev
   ```

5. Run the app:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Build the app for production |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint |

## License

Private project — all rights reserved.
