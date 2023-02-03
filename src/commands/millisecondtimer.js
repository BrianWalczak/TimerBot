const { SlashCommandBuilder } = require("discord.js");

function runTimer(interaction, time) {
	var timeinMilliseconds = time
	
	setTimeout(() => {
		interaction.followUp(`**<@${interaction.user.id}> Your timer for ${time} milliseconds has finished!**`)
	}, timeinMilliseconds + 500);
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("millisecondtimer")
    .setDescription("Set a timer for a desired time in milliseconds")
		.addNumberOption(option =>
			option.setName('milliseconds')
			.setDescription('Time in milliseconds')
			.setRequired(true)),
    run: async (client, interaction) => {
      interaction.reply(`**Your timer for ${interaction.options.getNumber('milliseconds')} millisecond(s) has started. You will be notified once your timer ends.**`);

			runTimer(interaction, Number(interaction.options.getNumber('milliseconds')))
    }
 };