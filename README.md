# RENT4LESS Prototype Site

Marketing & validation site for the Rent4Less concept: an affordable, transparent rental platform connecting Ghanaian tenants, landlords, employers, and banking partners.

## Quick Start

```bash
cd /Users/kwakuboateng/Documents/RENT4LESS
npx serve .
```

Then open http://localhost:3000 in a browser.

The site is fully static (`index.html`, `styles.css`, `script.js`) and supports client-side property submissions, listing filters, and an affordability calculator.

## Deploy to Vercel

1. Install the [Vercel CLI](https://vercel.com/cli) if you do not already have it:
   ```bash
   npm i -g vercel
   ```
2. From the project root, run:
   ```bash
   vercel
   ```
   Follow the prompts to link or create a project.
3. For subsequent deployments, use:
   ```bash
   vercel --prod
   ```

The provided `vercel.json` config ensures all static assets are served and that every route resolves to `index.html` for a simple single-page experience.

## Key Features

- **Property submission form** persists new listings in browser storage and updates the featured grid.
- **Filter tools** for budget and payment flexibility.
- **AI-inspired rent calculator** estimates affordability based on income and household size.
- **Tenant tools & academy** sections highlight the platform's value propositions from the research brief.
- **Modal overlays** explaining reputation scoring and 3D tours.

## Next Ideas

- Replace local storage with a hosted backend (Supabase, Firebase) to share listings.
- Integrate a real scoring algorithm and employer verification flow.
- Add user authentication for tenants and landlords.

