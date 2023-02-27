const { SlashCommandBuilder } = require('discord.js');
const { PermissionsBitField } = require('discord.js');
const ms = require('ms');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gcreate')
        .setDescription('Creates a giveway')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
        .addChannelOption((option) =>
            option.setDescription('The channel where the giveaway will be hosted').setName('channel').setRequired(true)
        )
        .addStringOption((option) => option.setDescription('The prize').setName('prize').setRequired(true))
        .addStringOption((option) =>
            option.setDescription('The duration of the giveaway').setName('duration').setRequired(true)
        )
        .addIntegerOption((option) =>
            option.setDescription('The number of winners').setName('winners').setRequired(true)
        ),
    async execute(interaction, client) {
        const duration = interaction.options.getString('duration');
        const winners = interaction.options.getInteger('winners');
        const prize = interaction.options.getString('prize');
        const channel = interaction.options.getChannel('channel');

        await client.giveawaysManager
            .start(channel, {
                duration: ms(duration),
                winnerCount: winners,
                prize: prize,
                messages: {
                    giveaway: '',
                    giveawayEnded: '',
                    winMessage:
                        '<a:donowall:1079322151112409098> Congratulations, {winners}! You won **{this.prize}**!\n',
                    inviteToParticipate: 'React with <a:donowall:1079322151112409098>  to participate!'
                }
            })
            .then((data) => {
                console.log(data);
                interaction.reply({
                    content: 'Giveaway created!',
                    ephemeral: true
                });
            });
    }
};
