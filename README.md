# Nexy Bot — Discord Reseller

Nexy Spoofers Discord bot for reseller pricing and panel access management.

## Features

- ✅ Slash command `/nexy` — displays pricing embed
- ✅ Role-based access control (reseller-only)
- ✅ Clean magenta embed design
- ✅ Production-ready for Railway + GitHub

## Setup

### 1. Local Development

```bash
# Clone or download this repo
npm install

# Copy .env.example to .env
cp .env.example .env

# Add your Discord bot credentials to .env
DISCORD_TOKEN=your_actual_token
CLIENT_ID=your_actual_client_id

# Start the bot
npm start
```

### 2. Get Your Discord Credentials

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a New Application
3. Go to **Bot** section → Click **Add Bot**
4. Copy the **TOKEN** → paste into `.env` as `DISCORD_TOKEN`
5. Go to **OAuth2** → **URL Generator**
6. Scopes: `bot` + `applications.commands`
7. Permissions: `Send Messages`, `Embed Links`, `Use Application Commands`
8. Copy the generated URL → invite bot to your server

### 3. Update Role ID

In `commands/nexy.js`, line 8:
```javascript
const ALLOWED_ROLE = '1555865533226680320'; // Replace with your role ID
```

To get your role ID:
- Enable Developer Mode in Discord settings
- Right-click the role → Copy Role ID

### 4. Deploy to Railway

1. Push this repo to GitHub
2. Go to [Railway.app](https://railway.app)
3. Create new project → Connect GitHub repo
4. Add environment variables in Railway dashboard:
   - `DISCORD_TOKEN` = your bot token
   - `CLIENT_ID` = your application ID
5. Railway auto-deploys on every push

## Usage

Once bot is online:

```
/nexy
```

Only users with the specified role can see the command response.

## Project Structure

```
nexy-bot/
├── index.js              # Main bot entry point
├── package.json          # Dependencies
├── .env.example          # Template for secrets (commit this)
├── .env                  # Your actual secrets (DO NOT COMMIT)
├── .gitignore           # Git ignore rules
├── README.md            # This file
├── commands/
│   └── nexy.js          # Pricing command
└── events/
    └── ready.js         # Bot startup event
```

## Troubleshooting

**Bot won't start?**
- Check `.env` has correct token and client ID
- Make sure bot has intents enabled in Developer Portal

**Slash command not showing?**
- Bot may need to be restarted
- Check role ID is correct
- Make sure bot has `applications.commands` scope

**Railway not deploying?**
- Check environment variables are set correctly
- Verify `package.json` and `index.js` are in root directory
- Check Railway logs for errors

## Support

For issues or updates, check the Discord bot logs.

---

Built with discord.js v14
