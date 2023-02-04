const { SlashCommandBuilder } = require("discord.js");

function runTimer(interaction, seconds, minutes) {
	var timeinMilliseconds = (seconds * 1000) + (minutes * 60000)
	var ringDate = new Date().getTime() + timeinMilliseconds
		
	var checkingInterval = setInterval(() => {
		if(new Date().getTime() >= ringDate) {
			if(minutes == 0 && seconds != 0) {
				interaction.followUp(`**<@${interaction.user.id}> Your timer for ${seconds} seconds has finished!**`)
				clearInterval(checkingInterval)
			}

			if(seconds == 0 && minutes != 0) {
				interaction.followUp(`**<@${interaction.user.id}> Your timer for ${minutes} minutes has finished!**`)
				clearInterval(checkingInterval)
			}

			if(seconds != 0 && minutes != 0) {
				interaction.followUp(`**<@${interaction.user.id}> Your timer for ${minutes} minutes and ${seconds} seconds has finished!**`)
				clearInterval(checkingInterval)
			}
		}
	}, 100);
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timer")
    .setDescription("Set a timer for a desired time")
		.addNumberOption(option =>
			option.setName('minutes')
			.setDescription('Time in minutes')
			.setRequired(true))
		.addNumberOption(option =>
			option.setName('seconds')
			.setDescription('Time in seconds')
			.setRequired(true)),
    run: async (client, interaction) => {
			if(Number(interaction.options.getNumber('seconds')) == 0 && Number(interaction.options.getNumber('minutes')) == 0) {
				interaction.reply(`**Your timer must have a time!**`);
			}else{
				if(Number(interaction.options.getNumber('minutes')) == 0 && Number(interaction.options.getNumber('seconds')) != 0) {
				interaction.reply(`**Your timer for ${interaction.options.getNumber('seconds')} seconds has started. You will be notified once your timer ends.**`);

				runTimer(interaction, Number(interaction.options.getNumber('seconds')), Number(interaction.options.getNumber('minutes')))
			}

			if(Number(interaction.options.getNumber('seconds')) == 0 && Number(interaction.options.getNumber('minutes')) != 0) {
				interaction.reply(`**Your timer for ${interaction.options.getNumber('minutes')} minutes has started. You will be notified once your timer ends.**`);

				runTimer(interaction, Number(interaction.options.getNumber('seconds')), Number(interaction.options.getNumber('minutes')))
			}

			if(Number(interaction.options.getNumber('seconds')) != 0 && Number(interaction.options.getNumber('minutes')) != 0) {
				interaction.reply(`**Your timer for ${interaction.options.getNumber('minutes')} minutes and ${interaction.options.getNumber('seconds')} seconds has started. You will be notified once your timer ends.**`);

				runTimer(interaction, Number(interaction.options.getNumber('seconds')), Number(interaction.options.getNumber('minutes')))
			}
			}
    }
 };