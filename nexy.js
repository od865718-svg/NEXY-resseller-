const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nexy')
    .setDescription('Nexy Spoofers — Pricing and Panel Access'),
  
  async execute(interaction) {
    // Role check
    const ALLOWED_ROLE = '1555865533226680320';
    
    if (!interaction.member.roles.cache.has(ALLOWED_ROLE)) {
      return interaction.reply({ 
        content: '❌ Access denied. This command is reseller-only.',
        ephemeral: true 
      });
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

    await interaction.reply({ embeds: [embed] });
  }
};
