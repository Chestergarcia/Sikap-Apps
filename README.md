# Sikap

Sikap is a community for sharing personal growth and progress. Rewards are
simulated in this development stage; there are no real-money transfers.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Current scope

- Landing page and responsive login/sign-up previews
- Reusable UI foundation and `/design-system` component preview
- Responsive home feed with demo post, like, comment, search, and category-filter interactions
- Explore topics and people, edit a demo profile, and track local goals and activity
- Simulated rewards wallet and notifications with sample-only data and page-local interactions
- Local settings preview and a standalone `/admin` demo dashboard, separate from regular user navigation, with sample queue actions
- Demo data is illustrative; local state may reset when refreshing or leaving a page
- Authentication is not connected; form submissions are demo-only and do not
  send or store credentials
- Feed, rewards, and notifications are not connected to a backend. There are no
  real payouts or withdrawable funds; moderation, AI verification, and Supabase
  are not connected. The standalone admin page is a UI preview only and has no
  authentication or permission checks; it is not safe for real admin data.

## Checks

```bash
npm run lint
npm run build
```
