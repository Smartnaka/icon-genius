<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1Tly7fNVZ6NiEM9-KkDJW5mlCyKpr-DZr

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to Vercel

1. Push your code to GitHub
2. Import your repository to Vercel
3. **Important**: In Vercel dashboard, go to Settings → Environment Variables and add:
   - Variable name: `GEMINI_API_KEY`
   - Value: Your Gemini API key (e.g., `AIzaSyDQrT3GqZJzOvyWP_lvH6Z9qeKCgZ3oHL4`)
   - Environment: Production, Preview, and Development (select all)
4. Deploy!

The API key is now securely stored server-side and will not be exposed in the client bundle.
