const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('builder')
        .setDescription('Returns with Embed Type Message')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
        .addStringOption((option) =>
            option.setName('title').setDescription('This is the title of the embed').setRequired(true)
        )
        .addStringOption((option) =>
            option.setName('description').setDescription('This is the description of the embed').setRequired(true)
        ),

    async execute(interaction, client) {
        const title = interaction.options.getString('title');
        var description = interaction.options.getString('description');
        description = description.replace(/\\n/g, '\n');
        const embed = new EmbedBuilder()
            .setTitle(title)
            .setColor(0x0099ff)
            .setDescription(description)
            .setTimestamp(Date.now())
            .setThumbnail(`https://cdn.discordapp.com/attachments/1075644833672204348/1076096468345159700/d.jpg`);

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))
            return await interaction.reply({
                content: "You don't have the required permissions to use this command",
                ephemeral: true
            });
        await interaction.reply({ embeds: [embed] });
    }
};
