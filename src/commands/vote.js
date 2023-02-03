const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("vote")
    .setDescription("Vote for Timer Bot on VoidBots!"),
    run: async (client, interaction) => {
      interaction.reply(`**:ballot_box_with_check: | Thanks for your support!**
**| You can vote every 12 hours!**
**| <https://top.gg/bot/759432068651548705/vote>**`);
    }
 };