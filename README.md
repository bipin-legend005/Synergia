# Synergia Event Booking API

Minimal instructions to run this project locally and push changes to GitHub.

Prerequisites
- Node.js (>=16) and npm
- MongoDB running locally or a MongoDB Atlas URI

Setup
1. Copy `.env.example` to `.env` and update values:

   MONGODB_URI=mongodb://127.0.0.1:27017/synergia_db
   PORT=5000

2. Install dependencies:

   npm install

3. Start the server:

   npm start

Local git commit & push (example)

Run these commands from the project root in a Windows `cmd.exe` shell:

```cmd
cd "d:\Bipin Files\coding files\SkillLab3\synergia-event-booking-api"
git status
git add server.js README.md .env.example
# Note: `.env` is in .gitignore and should NOT be committed if it contains secrets
git commit -m "chore: wait for MongoDB before starting server; add .env.example and docs"
# If you don't have a remote yet, add it (replace with your repo URL):
git remote add origin https://github.com/sayeeshtelang/synergia-event-booking-api.git
git push -u origin main
```

If you prefer SSH instead of HTTPS, use your SSH remote URL when adding the remote.

Notes
- `.env` is ignored by `.gitignore` — keep secrets out of version control.
- If you want the server to retry DB connections instead of exiting on failure, I can add retry/backoff logic.
