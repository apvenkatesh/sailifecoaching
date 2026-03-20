# Sai Life Coaching Website

## Project Overview
Life coaching website for Coach Shanmuga Priya ("Sai Life Coaching"), migrated from Figma and redesigned with a Branner Builders-inspired aesthetic.

## Tech Stack
- **Frontend**: React + Vite + TypeScript + TailwindCSS + shadcn/ui
- **Backend**: Express.js + TypeScript
- **Storage**: In-memory (MemStorage) — no database needed for current features
- **Email**: Resend package installed (`resend` npm package)

## Design System
- **Colors**: Navy `#1b2a3b`, Amber/Gold `#c8953d`, Dark brown `#3d2414`, Cream `#f5f4f0`
- **Fonts**: Raleway (headings/nav), Open Sans (body), Dancing Script (brand title)
- **Nav height**: 130px sticky, logo 110px

## Key Files
- `client/src/pages/Sp.tsx` — Main page, manages booking modal state
- `client/src/components/StickyNav.tsx` — Sticky navigation
- `client/src/components/BookingModal.tsx` — Full booking flow modal
- `client/src/pages/sections/HeroIntroSection.tsx` — Hero with background image
- `client/src/pages/sections/ServicesOverviewSection.tsx` — Services grid cards
- `client/src/pages/sections/CoachingProgramsSection.tsx` — Coaching program cards
- `client/src/pages/sections/ContactInfoSection.tsx` — Contact info
- `server/routes.ts` — API routes including `/api/book-appointment`
- `server/storage.ts` — In-memory storage with appointments
- `shared/schema.ts` — Drizzle schema (users + appointments tables)

## Assets
All Figma assets in `client/public/figmaAssets/`:
- `logo-transparent.png` — Main logo (background removed)
- `hero-bg.png` — Hero background image (crystal figure)
- `ellipse-1.png` — Coach photo (circular)
- `rectangle-24.png` — Original hero/landscape image
- `pictures.png` — Gallery strip

## Contact Info
- Phone: (925)-922-9980
- Email: saishree99@gmail.com
- Instagram: @sp.lifecoach
- Coach email for bookings: meetcoachsp@gmail.com

## Booking System
- Multi-step modal: customer info → appointment type → calendar → time slot → referral source
- Time slots: 10:00-11:00 AM, 11:30 AM-12:30 PM, 1:30-2:30 PM (Mon–Fri only)
- Duration: 60 minutes, virtual only
- Stores appointments in memory via `/api/book-appointment`
- Email confirmation via Resend (requires `RESEND_API_KEY` environment variable)

## Email Setup (PENDING)
**NOTE**: Email confirmations are implemented but require a `RESEND_API_KEY` secret to activate.
- The Resend integration was dismissed by the user — ask for API key directly.
- To add: Go to Settings → Secrets → Add `RESEND_API_KEY`
- Without the key, bookings are stored but no emails are sent (graceful fallback).
- Coach notification email goes to: meetcoachsp@gmail.com
