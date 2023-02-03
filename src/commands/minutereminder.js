const { SlashCommandBuilder } = require("discord.js");

function runTimer(interaction, time, reminder) {
	var timeinMilliseconds = time * 60000
	
	setTimeout(() => {
		interaction.followUp(`**<@${interaction.user.id}> You have a new reminder: ${reminder}**`)
	}, timeinMilliseconds + 500);
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("minutereminder")
    .setDescription("Set a reminder for a desired time in minutes")
		.addStringOption(option =>
			option.setName('reminder')
			.setDescription('Your reminder')
			.setRequired(true))
		.addNumberOption(option =>
			option.setName('minutes')
			.setDescription('Time in minutes')
			.setRequired(true)),
    run: async (client, interaction) => {
      interaction.reply(`**Your reminder for "${interaction.options.getString('reminder')}" has started. You will be notified once your timer ends.**`);

			runTimer(interaction, Number(interaction.options.getNumber('minutes')), interaction.options.getString('reminder'))
    }
 };