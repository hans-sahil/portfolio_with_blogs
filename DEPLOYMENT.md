# Deployment Guide

## Free Deployment Options

### Recommended Stack: Vercel + Supabase (PostgreSQL)

Both have generous free tiers and zero configuration cost.

### 1. Vercel (Hosting)

- **Link:** https://vercel.com
- **Free tier includes:** 100GB bandwidth, 6,000 build minutes/month, serverless functions
- **Why:** Vercel is built by the creators of Next.js — deployment is one-click from GitHub

**Steps:**
1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign up with GitHub
3. Click **"Add New Project"** → Import your repo
4. Vercel auto-detects Next.js — no configuration needed
5. Under **Environment Variables**, add:
   - `DATABASE_URL` — from Supabase (see below)
   - `ADMIN_PASSWORD` — set a strong password
6. Click **Deploy**

### 2. Supabase (PostgreSQL)

- **Link:** https://supabase.com
- **Free tier includes:** 2 databases (500MB each), no compute hour limits
- **Why:** Generous free tier, works with Drizzle ORM out of the box

**Steps:**
1. Go to [supabase.com](https://supabase.com) and sign up
2. Create a **new project** (free tier)
3. Go to **Project Settings → Database → Connection string**
4. Copy the **URI** format connection string
5. Add this as `DATABASE_URL` in Vercel

### Alternative Options

| Platform | Hosting | Database | Notes |
|---|---|---|---|
| **Railway** | ✅ Free ($5 credit/mo) | Built-in PostgreSQL | App sleeps on free tier |
| **Render** | ✅ Free (sleeps after inactivity) | Built-in PostgreSQL (1GB free) | Wakes on request, may have cold starts |
| **Neon** | N/A | Free (0.5GB, 100 compute hrs) | Serverless Postgres |

---

## Setting Up Locally (using Supabase)

1. Copy the environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with your Supabase connection string from **Project Settings → Database → Connection string (URI)**.

3. Apply migrations to create the database tables:
   ```bash
   npm run db:migrate
   ```

4. Start the dev server:
   ```bash
   npm run dev
   ```

5. (Optional) Open Drizzle Studio to manage data:
   ```bash
   npm run db:studio
   ```

## Adding the postinstall hook for Vercel

To auto-run migrations on Vercel, add to `package.json`:
```json
"scripts": {
  "postinstall": "npx drizzle-kit migrate"
}
```
This will run `drizzle-kit migrate` after `npm install` during Vercel builds.