# Sikap

Sikap is a community for sharing personal growth and progress. Rewards are
simulated in this development stage; there are no real-money transfers.

## Run locally

```bash
npm install
npm run dev
```

Local development runs at `http://localhost:3000`. The public SIKAP demo is available at [https://chestergarcia.github.io/Sikap-Apps/](https://chestergarcia.github.io/Sikap-Apps/), with the admin dashboard at [https://chestergarcia.github.io/Sikap-Apps/admin/](https://chestergarcia.github.io/Sikap-Apps/admin/).

## Supabase backend setup

The backend foundation lives in [`supabase/schema.sql`](./supabase/schema.sql). To connect a Supabase project:

1. Create a Supabase project.
2. Copy [`.env.example`](./.env.example) to `.env.local`.
3. Add the project URL and anon key from Supabase Project Settings → API.
4. Run `supabase/schema.sql` in the Supabase SQL Editor.
5. Start the app with `npm run dev` and test `/auth/sign-up`.

Without those environment variables, the app stays in clearly labeled demo mode. GitHub Pages remains a static frontend deployment; authenticated backend usage should be deployed through a server-capable host with the same environment variables.

## GitHub Pages

The `main` branch deploys to [Sikap on GitHub Pages](https://chestergarcia.github.io/Sikap-Apps/)
through the GitHub Actions workflow. Before the first deployment, open the
[Pages settings](https://github.com/Chestergarcia/Sikap-Apps/settings/pages)
and select **GitHub Actions** as the deployment source.

## Current scope

- Responsive onboarding screen that links directly to the community feed and login/sign-up previews
- Reusable UI foundation and `/design-system` component preview
- Responsive home feed with demo post, like, comment, search, and category-filter interactions
- Explore topics and people, edit a demo profile, and track local goals and activity
- Simulated rewards wallet and notifications with sample-only data and page-local interactions
- Local settings preview and a standalone `/admin` dashboard with sample community metrics, member snapshots, post review, topic activity, and simulated reward summaries
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
