const { SlashCommandBuilder } = require("discord.js");
const {
   PermissionsBitField,
   ButtonStyle,
   ActionRowBuilder,
   ButtonBuilder,
   EmbedBuilder,
} = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("reactionroles")
      .setDescription("Let's User Choose Factions automatically")
      .addRoleOption((option) =>
         option
            .setName(`role1`)
            .setDescription("This is the first role to give to users")
            .setRequired(true)
      )
      .addRoleOption((option) =>
         option
            .setName(`role2`)
            .setDescription("This is the first role to give to users")
            .setRequired(true)
      )
      .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
   async execute(interaction, client) {
      const role1 = interaction.options.getRole("role1");
      const role2 = interaction.options.getRole("role2");

      if (
         !interaction.member.permissions.has(
            PermissionsBitField.Flags.Administrator
         )
      )
         return await interaction.reply({
            content:
               "You don't have the required permissions to use this command",
            ephemeral: true,
         });

      const button = new ActionRowBuilder().addComponents(
         new ButtonBuilder()
            .setCustomId("button1")
            .setLabel(`${role1.name}`)
            .setEmoji("<a:donowall:1079322151112409098>")
            .setStyle(ButtonStyle.Secondary),

         new ButtonBuilder()
            .setCustomId("button2")
            .setLabel(`${role2.name}`)
            .setEmoji("👎")
            .setStyle(ButtonStyle.Secondary)
      );

      const embed = new EmbedBuilder()
         .setColor("Blue")
         .setTitle("Reaction Roles")
         .setDescription("Choose your faction");

      await interaction.reply({ embeds: [embed], components: [button] });

      const collector =
         await interaction.channel.createMessageComponentCollector();
      collector.on("collect", async (i) => {
         const member = i.member;
         if (i.guild.members.me.roles.highest.position < role1.position) {
            i.update({
               content:
                  "I don't have the required permissions to give you the role",
               ephemeral: true,
            });
            return;
         } else if (
            i.guild.members.me.roles.highest.position < role2.position
         ) {
            i.update({
               content:
                  "I don't have the required permissions to give you the role",
               ephemeral: true,
            });
            return;
         }

         if (i.customId === "button1") {
            if (member.roles.cache.has(role1.id)) {
               member.roles.remove(role1);
               i.reply({
                  content: `Your ${role1} role has been removed`,
                  ephemeral: true,
               });
            } else if (member.roles.cache.has(role2.id)) {
               i.reply({
                  content: `Your can only either chose ${role1} or ${role2}`,
                  ephemeral: true,
               });
            } else {
               member.roles.add(role1);
               i.reply({
                  content: `You have been given the role ${role1}`,
                  ephemeral: true,
               });
            }
         }
         if (i.customId === "button2") {
            if (member.roles.cache.has(role2.id)) {
               member.roles.remove(role2);
               i.reply({
                  content: `Your ${role2} role has been removed`,
                  ephemeral: true,
               });
            } else if (member.roles.cache.has(role1.id)) {
               i.reply({
                  content: `Your can only either chose ${role1} or ${role2}`,
                  ephemeral: true,
               });
            } else {
               member.roles.add(role2);
               i.reply({
                  content: `You have been given the role ${role2}`,
                  ephemeral: true,
               });
            }
         }
      });
   },
};
