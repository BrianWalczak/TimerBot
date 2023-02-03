const { SlashCommandBuilder } = require("discord.js");

function runTimer(interaction, time) {
	var timeinMilliseconds = time * 1000
	
	setTimeout(() => {
		interaction.followUp(`**<@${interaction.user.id}> Your timer for ${time} seconds has finished!**`)
	}, timeinMilliseconds + 500);
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("secondtimer")
    .setDescription("Set a timer for a desired time in seconds")
		.addNumberOption(option =>
			option.setName('seconds')
			.setDescription('Time in seconds')
			.setRequired(true)),
    run: async (client, interaction) => {
      interaction.reply(`**Your timer for ${interaction.options.getNumber('seconds')} second(s) has started. You will be notified once your timer ends.**`);

			runTimer(interaction, Number(interaction.options.getNumber('seconds')))
    }
 };