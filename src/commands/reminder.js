const { SlashCommandBuilder } = require("discord.js");

function runTimer(user, channel, seconds, minutes, reminder, ping) {
	var timeinMilliseconds = (seconds * 1000) + (minutes * 60000)
	var ringDate = new Date().getTime() + timeinMilliseconds

	if(ping == null) {
		ping = "None"
	}
		
	var checkingInterval = setInterval(() => {
		if(new Date().getTime() >= ringDate) {
			channel.send(`**<@${user.id}> You have a new reminder: ${reminder}**

**Ping: ||${ping}||**`)
			clearInterval(checkingInterval)
		}
	}, 100);
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reminder")
    .setDescription("Set a reminder to ping you in a desired time")
		.addStringOption(option =>
			option.setName('reminder')
			.setDescription('What you want to be notified about (your reminder)')
			.setRequired(true))
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
				interaction.reply(`**Your reminder must have a time frame!**`);
			}else{
				interaction.reply(`**Your reminder for "${interaction.options.getString('reminder')}" has started. You will be notified once your timer ends.**`);

				runTimer(interaction.user, interaction.channel, Number(interaction.options.getNumber('seconds')), Number(interaction.options.getNumber('minutes')), interaction.options.getString('reminder'), interaction.options.getString('ping'))
			}
    }
 };