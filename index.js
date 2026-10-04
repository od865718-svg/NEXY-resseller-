require('dotenv').config();
const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// OPTIONAL: leave as is if you don't want a banner yet.
// When ready, replace with your raw image URL.
const LOGO_URL = 'PASTE_RAW_LINK_HERE';
const HAS_LOGO = LOGO_URL.startsWith('http');

const commands = [
    new SlashCommandBuilder()
        .setName('panel')
        .setDescription('Sends the NEXY reseller panel in this channel.'),
    new SlashCommandBuilder()
        .setName('timer')
        .setDescription('Shows the current date and the date one month from now.'),
].map(command => command.toJSON());

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
    try {
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands },
        );
        console.log('Successfully registered application commands.');
    } catch (error) {
        console.error(error);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    // ─────────────────────────── /PANEL ───────────────────────────
    if (interaction.commandName === 'panel') {
        await interaction.deferReply({ ephemeral: true });

        const roleId = process.env.ROLE_ID || '1555865533226680320';

        if (!interaction.member || !interaction.member.roles.cache.has(roleId)) {
            return interaction.editReply({ 
                content: 'You do not have permission to use this command.' 
            });
        }

        const embed = new EmbedBuilder()
            .setTitle('✨ NEXY — Reseller Program ✨')
            .setColor('#FF10F0')
            .setDescription(
                '💠 **15,000+** Devices Successfully Spoofed\n' +
                '💠 One of the most trusted brands in the scene\n' +
                '💠 Over **40 official resellers**\n\n' +

                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
                '🌟 **Why Resell with NEXY?**\n' +
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
                '✅ Strong and respected reputation in the community\n' +
                '✅ Knowledgeable support team\n' +
                '✅ GitBook Instructions included\n' +
                '✅ Secured loader infrastructure\n' +
                '✅ Easy rebranding process\n' +
                '✅ No community presence required\n\n' +

                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
                '🛒 **Panel Access**\n' +
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +

                '🎮 **General Spoofer**\n' +
                '├ 📅 **Monthly — Unbranded** ─ **$150**\n' +
                '├ 📅 **Monthly — Full Rebrand** ─ **$200**\n' +
                '├ ♾️ **Lifetime — Unbranded** ─ **$300**\n' +
                '└ ♾️ **Lifetime — Full Rebrand** ─ **$800**\n\n' +

                '🎮 **Temp Spoofer**\n' +
                '├ 📅 **Monthly — Unbranded** ─ **$150**\n' +
                '└ 📅 **Monthly — Full Rebrand** ─ **$200**\n\n' +

                '🎯 **Fortnite Cheats**\n' +
                '├ 📅 **Monthly — Unbranded** ─ **$150**\n' +
                '├ 📅 **Monthly — Full Rebrand** ─ **$200**\n' +
                '├ ♾️ **Lifetime — Unbranded** ─ **$300**\n' +
                '└ ♾️ **Lifetime — Full Rebrand** ─ **$800**\n\n' +

                '🔫 **Rust Cheats**\n' +
                '├ 📅 **Monthly — Unbranded** ─ **$150**\n' +
                '├ 📅 **Monthly — Full Rebrand** ─ **$200**\n' +
                '├ ♾️ **Lifetime — Unbranded** ─ **$300**\n' +
                '└ ♾️ **Lifetime — Full Rebrand** ─ **$800**\n\n' +

                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
                '🎁 **Bulk Key Discounts**\n' +
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
                '💥 For resellers with consistent volume — enjoy exclusive price reductions on larger orders.\n' +
                '🔥 **Purchase 10+ Keys and Get 60% OFF** (Unbranded Loaders)!\n'
            );

        // Only add banner/footer icon if a real link exists
        if (HAS_LOGO) {
            embed.setImage(LOGO_URL);
            embed.setFooter({ text: 'NEXY Reseller Program', iconURL: LOGO_URL });
        } else {
            embed.setFooter({ text: 'NEXY Reseller Program' });
        }

        try {
            await interaction.channel.send({ embeds: [embed] });
            await interaction.editReply({ content: '✨ Panel sent!' });
        } catch (error) {
            console.error(error);
            await interaction.editReply({ content: 'There was an error sending the panel. Check the logs.' });
        }
    }

    // ─────────────────────────── /TIMER ───────────────────────────
    if (interaction.commandName === 'timer') {
        await interaction.deferReply({ ephemeral: true });

        const now = new Date();
        const oneMonthLater = new Date(now);
        oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

        const nowUnix = Math.floor(now.getTime() / 1000);
        const nextUnix = Math.floor(oneMonthLater.getTime() / 1000);

        const nowPretty = now.toLocaleString('en-GB', {
            weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
            hour: '2-digit', minute: '2-digit', timeZoneName: 'short'
        });
        const nextPretty = oneMonthLater.toLocaleString('en-GB', {
            weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
            hour: '2-digit', minute: '2-digit', timeZoneName: 'short'
        });

        const embed = new EmbedBuilder()
            .setTitle('⏱️ NEXY — Timer')
            .setColor('#FF10F0')
            .setDescription(
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
                '📅 **Current Date**\n' +
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
                `> **${nowPretty}**\n` +
                `> <t:${nowUnix}:R>\n\n` +

                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
                '⏳ **One Month From Now**\n' +
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
                `> **${nextPretty}**\n` +
                `> <t:${nextUnix}:R>\n\n` +

                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
                `🧮 **Total Days:** ${Math.round((nextUnix - nowUnix) / 86400)} days`
            );

        try {
            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.editReply({ content: 'There was an error sending the timer.' });
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
