require('dotenv').config();
const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// REPLACE THIS WITH YOUR RAW GITHUB IMAGE LINK
const LOGO_URL = 'https://github.com/od865718-svg/NEXY-resseller-/blob/6324acb9e3a1c2a5d9f9c583c84979f8948dc283/nexy%20banner%20(1).png'; 

const commands = [
    new SlashCommandBuilder()
        .setName('panel')
        .setDescription('Sends the NEXY reseller panel in this channel.'),
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
    
    if (interaction.commandName === 'panel') {
        const roleId = process.env.ROLE_ID || '1555865533226680320';
        
        // Check if user has the specific role
        if (!interaction.member.roles.cache.has(roleId)) {
            return interaction.reply({ 
                content: 'You do not have permission to use this command.', 
                ephemeral: true 
            });
        }

        const embed = new EmbedBuilder()
            .setTitle('NEXY — Reseller Program')
            .setColor('#FF10F0') // Neon Pink
            .setDescription(
                '➳ 15,000+ Devices Successfully Spoofed\n' +
                '➳ One of the most trusted brands in the scene.\n' +
                '➳ Over 40 official resellers.\n\n' +
                
                '✅ **Why Resell with NEXY?**\n' +
                '• Strong and respected reputation in the community\n' +
                '• Knowledgeable support team\n' +
                '• GitBook Instructions included\n' +
                '• Secured loader infrastructure\n' +
                '• Easy rebranding process\n' +
                '• No community presence required\n\n' +
                
                '✅ **Panel Access**\n' +
                '**General Spoofer**\n' +
                '➳ Permanent Woofer ➳ $300 / Lifetime (Unbranded)\n' +
                '➳ Permanent Woofer ➳ $800 / Lifetime (Full rebrand: name, logo, colors)\n' +
                '➳ Permanent Woofer ➳ $150 / Monthly (Unbranded)\n' +
                '➳ Permanent Woofer ➳ $200 / Monthly (Full rebrand: name, logo, colors)\n' +
                '➳ Temp Woofer ➳ $150 / Monthly (Unbranded)\n' +
                '➳ Temp Woofer ➳ $200 / Monthly (Full rebrand: name, logo, colors)\n\n' +
                
                '**Fortnite Spoofer**\n' +
                '➳ Permanent Woofer ➳ $300 / Lifetime (Unbranded)\n' +
                '➳ Permanent Woofer ➳ $800 / Lifetime (Full rebrand: name, logo, colors)\n' +
                '➳ Permanent Woofer ➳ $150 / Monthly (Unbranded)\n' +
                '➳ Permanent Woofer ➳ $200 / Monthly (Full rebrand: name, logo, colors)\n\n' +
                
                '**Rust Spoofer**\n' +
                '➳ Permanent Woofer ➳ $300 / Lifetime (Unbranded)\n' +
                '➳ Permanent Woofer ➳ $800 / Lifetime (Full rebrand: name, logo, colors)\n' +
                '➳ Permanent Woofer ➳ $150 / Monthly (Unbranded)\n' +
                '➳ Permanent Woofer ➳ $200 / Monthly (Full rebrand: name, logo, colors)\n\n' +
                
                '✅ **Bulk Key Discounts**\n' +
                'For resellers with consistent volume — enjoy exclusive price reductions on larger orders.\n' +
                '➳ Purchase 10+ Keys and Get 60% Off (Unbranded Loaders)!'
            )
            .setImage(LOGO_URL) // This puts your banner image at the bottom of the embed
            .setFooter({ text: 'NEXY Reseller Program', iconURL: LOGO_URL });

        await interaction.channel.send({ embeds: [embed] });
        await interaction.reply({ content: 'Panel sent!', ephemeral: true });
    }
});

client.login(process.env.DISCORD_TOKEN);
