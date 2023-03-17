const { SlashCommandBuilder } = require("discord.js");

function runTimer(user, channel, seconds, minutes, ping) {
	var timeinMilliseconds = (seconds * 1000) + (minutes * 60000)
	var ringDate = new Date().getTime() + timeinMilliseconds

	if(ping == null) {
		ping = "None"
	}
		
	var checkingInterval = setInterval(() => {
		if(new Date().getTime() >= ringDate) {
			if(minutes == 0 && seconds != 0) {
				channel.send(`**<@${user.id}> Your timer for ${seconds} seconds has finished!**

**Ping: ||${ping}||**`)
				clearInterval(checkingInterval)
			}

			if(seconds == 0 && minutes != 0) {
				channel.send(`**<@${user.id}> Your timer for ${minutes} minutes has finished!**

**Ping: ||${ping}||**`)
				clearInterval(checkingInterval)
			}

			if(seconds != 0 && minutes != 0) {
				channel.send(`**<@${user.id}> Your timer for ${minutes} minutes and ${seconds} seconds has finished!**

**Ping: ||${ping}||**`)
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
			.setRequired(true))
		.addStringOption(option =>
			option.setName('ping')
			.setDescription("The person, or role, that will be pinged. If you leave this blank, only you will be pinged.")
			.setRequired(false)),
    run: async (client, interaction) => {
			if(Number(interaction.options.getNumber('seconds')) == 0 && Number(interaction.options.getNumber('minutes')) == 0) {
				interaction.reply(`**Your timer must have a time!**`);
			}else{
				if(Number(interaction.options.getNumber('minutes')) == 0 && Number(interaction.options.getNumber('seconds')) != 0) {
				interaction.reply(`**Your timer for ${interaction.options.getNumber('seconds')} seconds has started. You will be notified once your timer ends.**`);

				runTimer(interaction.user, interaction.channel, Number(interaction.options.getNumber('seconds')), Number(interaction.options.getNumber('minutes')), interaction.options.getString('ping'))
			}

			if(Number(interaction.options.getNumber('seconds')) == 0 && Number(interaction.options.getNumber('minutes')) != 0) {
				interaction.reply(`**Your timer for ${interaction.options.getNumber('minutes')} minutes has started. You will be notified once your timer ends.**`);

				runTimer(interaction.user, interaction.channel, Number(interaction.options.getNumber('seconds')), Number(interaction.options.getNumber('minutes')), interaction.options.getString('ping'))
			}

			if(Number(interaction.options.getNumber('seconds')) != 0 && Number(interaction.options.getNumber('minutes')) != 0) {
				interaction.reply(`**Your timer for ${interaction.options.getNumber('minutes')} minutes and ${interaction.options.getNumber('seconds')} seconds has started. You will be notified once your timer ends.**`);

				runTimer(interaction.user, interaction.channel, Number(interaction.options.getNumber('seconds')), Number(interaction.options.getNumber('minutes')), interaction.options.getString('ping'))
			}
			}
    }
 };