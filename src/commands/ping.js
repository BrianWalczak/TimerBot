const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Get Timer Bot's current ping"),
    run: async (client, interaction) => {
      interaction.reply(`**My latency is ${Date.now() - interaction.createdTimestamp}ms
My API Latency is ${Math.round(client.ws.ping)}ms**`);
    }
 };