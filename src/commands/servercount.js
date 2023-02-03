const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("servercount")
    .setDescription("Find out how many servers Timer Bot is in!"),
    run: async (client, interaction) => {
			client.shard.fetchClientValues('guilds.cache.size')
			.then(async results => {
				interaction.reply(`**I'm in ${results.reduce((acc, guildCount) => acc + guildCount, 0)} server(s)!**`)
			})
			.catch(console.error);
    }
 };