# DipSignal

DipSignal is a public Next.js website that evaluates whether S&P 500 "buy the dip" statistical
conditions are currently met.

## Indicators

- CNN Fear & Greed Index `< 10`
- VIX `> 30` from Yahoo Finance (`^VIX`)
- S5FI `< 20`, using published S&P 500 stocks above 50-day average data first
- Three consecutive red S&P 500 daily closes from Yahoo Finance (`^GSPC`)

At least two active rules produce: "Statistically favorable dip conditions detected".

## Run Locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

To manually compute the latest row locally:

```bash
curl "http://localhost:3000/api/cron/update?secret=replace-with-a-long-random-secret"
```

To backfill approximately two years of history:

```bash
curl "http://localhost:3000/api/cron/backfill?secret=replace-with-a-long-random-secret"
```

The backfill route is intentionally heavy because it may calculate historical S5FI from S&P 500
constituent candles when no free published two-year S5FI feed is available.

## Deploy To Vercel

1. Push this project to a Git provider.
2. Import it into Vercel as a Next.js project.
3. Add environment variables:
   - `CRON_SECRET`: a long random secret.
   - `BLOB_READ_WRITE_TOKEN`: connect a Vercel Blob store to the project for durable JSON cache and history.
   - `NEXT_PUBLIC_SITE_URL`: your production URL.
4. Deploy.
5. Trigger `/api/cron/backfill` once with `Authorization: Bearer <CRON_SECRET>` or `?secret=<CRON_SECRET>`.

`vercel.json` schedules `/api/cron/update` every 15 minutes.

## AdSense Placement

The ad placeholder is in `src/components/AdGateModal.tsx`. Replace the placeholder comment with the
Google AdSense script/ad unit after your AdSense account and domain are approved.

## Storage

Local development writes JSON files under `.data/`. On Vercel, the app uses Vercel Blob when
`BLOB_READ_WRITE_TOKEN` is present so history/cache remain online without your computer.

## Legal

This website provides statistical market indicators for educational purposes only. It is not
financial advice, investment advice, or a recommendation to buy or sell any securities.
