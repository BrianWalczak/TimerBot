const { SlashCommandBuilder } = require("discord.js");

function runTimer(interaction, time, reminder) {
	var timeinMilliseconds = time
	
	setTimeout(() => {
		interaction.followUp(`**<@${interaction.user.id}> You have a new reminder: ${reminder}**`)
	}, timeinMilliseconds + 500);
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("millisecondreminder")
    .setDescription("Set a reminder for a desired time in milliseconds")
		.addStringOption(option =>
			option.setName('reminder')
			.setDescription('Your reminder')
			.setRequired(true))
		.addNumberOption(option =>
			option.setName('milliseconds')
			.setDescription('Time in milliseconds')
			.setRequired(true)),
    run: async (client, interaction) => {
      interaction.reply(`**Your reminder for "${interaction.options.getString('reminder')}" has started. You will be notified once your timer ends.**`);

			runTimer(interaction, Number(interaction.options.getNumber('milliseconds')), interaction.options.getString('reminder'))
    }
 };