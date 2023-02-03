const { SlashCommandBuilder } = require("discord.js");

function runTimer(interaction, time) {
	var timeinMilliseconds = time * 60000
	
	setTimeout(() => {
		interaction.followUp(`**<@${interaction.user.id}> Your timer for ${time} minutes has finished!**`)
	}, timeinMilliseconds + 500);
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("minutetimer")
    .setDescription("Set a timer for a desired time in minutes")
		.addNumberOption(option =>
			option.setName('minutes')
			.setDescription('Time in minutes')
			.setRequired(true)),
    run: async (client, interaction) => {
      interaction.reply(`**Your timer for ${interaction.options.getNumber('minutes')} minute(s) has started. You will be notified once your timer ends.**`);

			runTimer(interaction, Number(interaction.options.getNumber('minutes')))
    }
 };