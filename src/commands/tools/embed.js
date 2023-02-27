const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rules')
        .setDescription('Returns with Server Rules')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle('Server Rules')
            .setColor(0x0099ff)
            .setDescription(
                `These are the rules of the server. Please follow them\n
            **1.) Treat everyone with respect. Absolutely no harassment, witch hunting, sexism, racism or hate speech will be tolerated.** \n\n
            **2.) No spam or self-promotion (server invites, advertisements, etc.) without permission. This includes DMing fellow members.**\n\n
            **3.) No age-restricted or obscene content. This includes text, images or links featuring nudity, sex, hard violence or other disturbing graphic content.**\n\n
            **4.) If you see a rule violation or a scene where you feel that your safety is threatened, please report it to the staff. Let's make this server a safe place for everyone to enjoy!**`
            )
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
