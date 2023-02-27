const { SlashCommandBuilder } = require('discord.js');
const { PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Returns with Pong!')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true
        });

        const newMessage = `API Latency: ${client.ws.ping}\n Client Ping: ${
            message.createdTimestamp - interaction.createdTimestamp
        }`;

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))
            return await interaction.reply({
                content: "You don't have the required permissions to use this command",
                ephemeral: true
            });
        await interaction.editReply({
            content: newMessage
        });
    }
};
