const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("support")
    .setDescription("Join our Discord support server for help"),
    run: async (client, interaction) => {
      interaction.reply(`**:ballot_box_with_check: | We're here to help!**
**| For support, join our support server by clicking [here](<https://discord.gg/xKsUXmsb8V>)**`);
    }
 };