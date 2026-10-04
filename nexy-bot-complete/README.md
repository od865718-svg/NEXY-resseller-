# Nexy Bot — Discord Reseller

Production-ready Discord bot for Nexy Spoofers reseller pricing and panel access.

## Features

✅ Slash command `/nexy` — displays pricing embed  
✅ Role-based access control (reseller-only)  
✅ Clean magenta design  
✅ Production-ready for Railway + GitHub  
✅ Zero dependencies issues  

## Quick Start

### 1. Clone & Setup Locally

```bash
# Clone your GitHub repo
git clone https://github.com/YOUR_USERNAME/nexy-bot.git
cd nexy-bot

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

### 2. Add Your Discord Credentials to .env

```
DISCORD_TOKEN=your_actual_bot_token
CLIENT_ID=your_actual_application_id
```

**Where to find them:**
- Go to [Discord Developer Portal](https://discord.com/developers/applications)
- Click your application
- Go to **Bot** section → Copy the **TOKEN**
- Go to **General Information** → Copy **APPLICATION ID**

### 3. Get Your Role ID

```
Discord Settings → Developer Mode (ON)
Right-click the reseller role → Copy Role ID
```

Update `commands/nexy.js` line 8:
```javascript
const ALLOWED_ROLE = '1555865533226680320'; // Replace with your role ID
```

### 4. Test Locally

```bash
npm start
```

You should see:
```
✅ Loaded command: nexy
✅ Loaded event: ready
✅ Slash commands registered
✅ Bot logged in as YourBotName#0000
```

### 5. Push to GitHub

```bash
git add .
git commit -m "initial: nexy discord bot"
git push
```

**Important:** Do NOT commit `.env` — it's in `.gitignore`

### 6. Deploy to Railway

1. Go to [Railway.app](https://railway.app)
2. Create new project → GitHub
3. Select your `nexy-bot` repo
4. Railway will auto-detect Node.js
5. Add environment variables:
   - `DISCORD_TOKEN` = your bot token
   - `CLIENT_ID` = your application ID
6. Railway auto-deploys on every push

## Project Structure

```
nexy-bot/
├── index.js                 # Main bot entry point
├── package.json             # Dependencies
├── .env.example             # Template (safe to commit)
├── .env                     # Your secrets (in .gitignore)
├── .gitignore              # Git rules
├── README.md               # This file
├── commands/
│   └── nexy.js             # /nexy pricing command
└── events/
    └── ready.js            # Bot startup event
```

## Commands

Once bot is online:

```
/nexy
```

Only users with the specified role can see this command.

## Troubleshooting

**Bot won't start locally?**
- Check `.env` has correct `DISCORD_TOKEN` and `CLIENT_ID`
- Run `npm install` again
- Make sure Node.js v20+ is installed

**Slash command not showing in Discord?**
- Bot needs `applications.commands` scope (it does by default)
- Wait 5 seconds for Railway to fully deploy
- Try restarting the bot

**Railway shows errors?**
- Check Variables tab has both `DISCORD_TOKEN` and `CLIENT_ID`
- Check Railway logs for the exact error
- Make sure you're pushing to GitHub (Railway watches main branch)

**Bot replies with "Access denied"?**
- Your user doesn't have the role specified in `commands/nexy.js`
- Double-check role ID is correct
- Update the role ID if you changed it

## Environment Variables (Railway)

```
DISCORD_TOKEN = your_bot_token
CLIENT_ID = your_application_id
```

Never share these. Keep them in Railway's Variables tab only.

## Support

Check Railway logs or Discord console for errors:
- `ENOENT` = missing file (shouldn't happen with fresh repo)
- `Discord API error` = token or client ID wrong
- `Cannot read property` = missing environment variables

---

Built with discord.js v14 | Deployed on Railway
