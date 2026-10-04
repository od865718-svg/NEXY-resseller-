const { Client, Collection, GatewayIntentBits, REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();

// Create directories if they don't exist
const commandsPath = path.join(__dirname, 'commands');
const eventsPath = path.join(__dirname, 'events');

if (!fs.existsSync(commandsPath)) {
  fs.mkdirSync(commandsPath, { recursive: true });
  console.log('📁 Created commands directory');
}

if (!fs.existsSync(eventsPath)) {
  fs.mkdirSync(eventsPath, { recursive: true });
  console.log('📁 Created events directory');
}

// Load commands
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const commands = [];

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
    console.log(`✅ Loaded command: ${command.data.name}`);
  } else {
    console.log(`⚠️ Command ${file} missing data or execute`);
  }
}

// Register slash commands
(async () => {
  try {
    console.log(`🔄 Registering ${commands.length} slash commands...`);
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
    
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );
    
    console.log('✅ Slash commands registered');
  } catch (error) {
    console.error('❌ Error registering commands:', error);
  }
})();

// Load events
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
  console.log(`✅ Loaded event: ${event.name}`);
}

// Slash command handler
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) {
    console.log(`❌ No command found for ${interaction.commandName}`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error('Command execution error:', error);
    try {
      await interaction.reply({
        content: '❌ Error executing command',
        ephemeral: true
      });
    } catch (replyError) {
      console.error('Reply error:', replyError);
    }
  }
});

// Prefix command handler
const PREFIX = '$';
const { EmbedBuilder } = require('discord.js');

client.on('messageCreate', async (message) => {
  if (message.author.bot || !message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  // $nexy command - role gated
  if (commandName === 'nexy') {
    const ALLOWED_ROLE = '1555865533226680320';
    
    if (!message.member.roles.cache.has(ALLOWED_ROLE)) {
      return message.reply({ content: '❌ Access denied. This command is reseller-only.' });
    }

    const embed = new EmbedBuilder()
      .setColor('#FF00FF')
      .setTitle('🌊 Nexy Spoofers — Reseller Program')
      .setDescription('15,000+ Devices Spoofed | One of the most trusted brands in the scene')
      .addFields(
        {
          name: '🎮 FORTNITE SPOOFERS',
          value: '**Monthly**\n' +
                 '• Unbranded: $100\n' +
                 '• Rebranded: $150\n\n' +
                 '**Lifetime**\n' +
                 '• Unbranded: $700\n' +
                 '• Rebranded: $1,500\n\n' +
                 '**Temp Access:** $100',
          inline: false
        },
        {
          name: '⚙️ RUST SPOOFERS',
          value: '**Monthly**\n' +
                 '• Unbranded: $100\n' +
                 '• Rebranded: $150\n\n' +
                 '**Lifetime**\n' +
                 '• Unbranded: $700\n' +
                 '• Rebranded: $1,500\n\n' +
                 '**Temp Access:** $100',
          inline: false
        },
        {
          name: '✅ BULK KEY DISCOUNTS',
          value: 'Purchase 10+ Keys → Get 40% Off (Unbranded Loaders)\n' +
                 'Volume pricing available for consistent resellers',
          inline: false
        },
        {
          name: '🔐 PANEL ACCESS',
          value: '**Permanent Woofer** → $700 Lifetime (Unbranded)\n' +
                 '**Permanent Woofer** → $200 Monthly (Full Rebrand)\n' +
                 '**Permanent Woofer** → $150 Monthly (Unbranded)\n' +
                 '**Temp Woofer** → $100 Monthly (Unbranded)',
          inline: false
        },
        {
          name: '💪 Why Resell with Nexy?',
          value: '• Strong and respected reputation\n' +
                 '• Knowledgeable support team\n' +
                 '• Secured loader infrastructure\n' +
                 '• Easy rebranding process\n' +
                 '• No community presence required',
          inline: false
        }
      )
      .setFooter({ text: 'DM for custom deals | Secured infrastructure' })
      .setTimestamp();

    return message.reply({ embeds: [embed] });
  }

  if (commandName === 'bye') {
    return message.reply('👋 See you later!');
  }

  if (commandName === 'ping') {
    return message.reply(`🏓 Pong! ${client.ws.ping}ms`);
  }

  if (commandName === 'help') {
    return message.reply(
      '```\n' +
      '📋 Prefix Commands ($)\n' +
      '$nexy - Nexy spoofers pricing\n' +
      '$bye - Say goodbye\n' +
      '$ping - Check bot latency\n' +
      '$help - Show this message\n\n' +
      '⚡ Slash Commands (/)\n' +
      '/nexy - Nexy spoofers pricing\n' +
      '```'
    );
  }
});

client.login(process.env.DISCORD_TOKEN);
