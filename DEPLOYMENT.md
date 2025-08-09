# Deployment Guide

## Netlify Deployment

### Required Configuration Updates

1. **Update Netlify Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `out`
   - Node.js version: 18.17.0 or higher

2. **Update Environment Variables:**
   Replace the old React environment variables with Next.js versions:

   **Old (React) Variables:**
   ```
   REACT_APP_FIREBASE_API_KEY
   REACT_APP_FIREBASE_AUTH_DOMAIN
   REACT_APP_FIREBASE_DATABASE_URL
   REACT_APP_FIREBASE_PROJECT_ID
   REACT_APP_FIREBASE_STORAGE_BUCKET
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID
   REACT_APP_FIREBASE_APP_ID
   REACT_APP_FIREBASE_MEASUREMENT_ID
   ```

   **New (Next.js) Variables:**
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD2zaDfpWA9-bstTBJfG4VOzTlKau32UiM
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=themuseduo-f1fd5.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://themuseduo-f1fd5-default-rtdb.firebaseio.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=themuseduo-f1fd5
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=themuseduo-f1fd5.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=577240047595
   NEXT_PUBLIC_FIREBASE_APP_ID=1:577240047595:web:09d14a4f9c438e4efd03ae
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-8T3R6VYG1H
   ```

### Step-by-Step Netlify Setup

1. **In Netlify Dashboard:**
   - Go to Site Settings → Build & Deploy → Environment
   - Delete all old `REACT_APP_*` variables
   - Add the new `NEXT_PUBLIC_*` variables listed above

2. **Update Build Settings:**
   - Go to Site Settings → Build & Deploy → Build Settings
   - Build command: `npm run build`
   - Publish directory: `out`
   - Base directory: (leave empty)

3. **Set Node.js Version:**
   - In Environment Variables, add:
     - Key: `NODE_VERSION`
     - Value: `18.17.0`

4. **Deploy:**
   - Trigger a new deploy from the Deploys tab
   - Or push changes to your connected Git repository

### Troubleshooting

**If build fails with Node.js version error:**
- Make sure `NODE_VERSION=18.17.0` is set in environment variables
- Clear build cache and retry

**If Firebase doesn't work:**
- Verify all `NEXT_PUBLIC_*` environment variables are set correctly
- Check browser console for Firebase connection errors

**If images don't load:**
- Static export uses unoptimized images for compatibility
- All images should still load from the public directory and external URLs

## Alternative: Vercel Deployment (Recommended for Next.js)

For better Next.js support, consider deploying to Vercel:

1. Connect your GitHub repository to Vercel
2. Vercel will auto-detect Next.js and configure correctly
3. Add the same `NEXT_PUBLIC_*` environment variables
4. No additional configuration needed

## Local Development

```bash
npm install
cp .env.local.example .env.local
# Edit .env.local with Firebase credentials
npm run dev
```