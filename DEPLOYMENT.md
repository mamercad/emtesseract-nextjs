# Deployment Guide - Cloudflare Pages via GitHub Actions

This project automatically deploys to Cloudflare Pages when you push to the `main` branch.

## Setup Instructions

### 1. Get Your Cloudflare Account ID

1. Go to https://dash.cloudflare.com/
2. Select any domain
3. Scroll down on the Overview page
4. Copy your **Account ID** (on the right sidebar)

### 2. Get Your Cloudflare API Token

You already have: `VWviou2taJuawAzah5Iox-m0f5AcK7HFPVCbHqlg`

**If this token doesn't work:**
1. Go to https://dash.cloudflare.com/profile/api-tokens
2. Click "Create Token"
3. Use template: **"Edit Cloudflare Workers"**
4. Make sure it has these permissions:
   - Account → Cloudflare Pages → Edit
   - Account → Account Settings → Read
5. Click "Continue to summary" → "Create Token"
6. Copy the token (you only see it once!)

### 3. Add GitHub Secrets

1. Go to your GitHub repo: https://github.com/mamercad/emtesseract-nextjs
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add two secrets:

**Secret 1:**
- Name: `CLOUDFLARE_API_TOKEN`
- Value: Your Cloudflare API token

**Secret 2:**
- Name: `CLOUDFLARE_ACCOUNT_ID`
- Value: Your Cloudflare Account ID (from step 1)

### 4. Deploy!

Once secrets are set up:
- Push to `main` branch → Auto-deploys
- Or go to Actions tab → "Deploy to Cloudflare Pages" → "Run workflow"

## What Happens on Deploy

1. **Build:** GitHub Actions builds your Next.js site
2. **Deploy:** Pushes to Cloudflare Pages
3. **Live:** Site goes live at:
   - Preview: `https://emtesseract.pages.dev`
   - Production: `https://emtesseract.com` (after domain setup)

## Connect Custom Domain (One-Time Setup)

After first successful deployment:

1. Go to https://dash.cloudflare.com/
2. Workers & Pages → Select `emtesseract`
3. Custom Domains → Add `emtesseract.com` and `www.emtesseract.com`
4. Cloudflare auto-configures DNS (already on Cloudflare!)

## Manual Deployment (Alternative)

If you prefer to deploy manually instead:

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
npm run build
wrangler pages deploy .next --project-name=emtesseract
```

## Workflow File

Located at: `.github/workflows/deploy.yml`

Triggers on:
- Push to `main` branch
- Manual trigger via Actions tab

---

**Need help?** The deployment workflow is configured and ready. Just add the GitHub secrets and push!
