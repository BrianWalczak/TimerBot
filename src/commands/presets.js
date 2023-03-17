const { SlashCommandBuilder } = require("discord.js");
const loki = require('lokijs');
var db = new loki('presets.db');
db.loadDatabase();

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
    .setName("presets")
    .setDescription("View all preset commands")
		
		//Commands list
		.addSubcommand((subcommand => subcommand
			.setName('commands')
			.setDescription('A list of all preset commands')
		))

		//Preset list
		.addSubcommand((subcommand => subcommand
			.setName('list')
			.setDescription('A list of all of your custom presets')
		))

		//Create preset
		.addSubcommand((subcommand => subcommand
			.setName('create')
			.setDescription('Create a new preset')
			.addStringOption((option => option
				.setName('tag')
				.setDescription('Your preset timers tag/name that will be used to run it')
				.setRequired(true)
			))
			.addNumberOption((option => option
				.setName('minutes')
				.setDescription('Time in minutes')
				.setRequired(true)
			))
			.addNumberOption((option => option
				.setName('seconds')
				.setDescription('Time in seconds')
				.setRequired(true)
			))))

		//Delete preset
		.addSubcommand((subcommand => subcommand
			.setName('delete')
			.setDescription('Delete an existing preset')
			.addStringOption((option => option
				.setName('tag')
				.setDescription('Your preset timers tag/name')
				.setRequired(true)
			))))

		//Start preset
		.addSubcommand((subcommand => subcommand
			.setName('start')
			.setDescription('Start an existing preset')
			.addStringOption((option => option
				.setName('tag')
				.setDescription('Your preset timers tag/name')
				.setRequired(true)
			))
			.addStringOption((option => option
				.setName('ping')
				.setDescription("The person, or role, that will be pinged. If you leave this blank, only you will be pinged.")
				.setRequired(false)
			)))),
    run: async (client, interaction) => {
			
			//Commands
			if(interaction.options.getSubcommand() == "commands") {
				interaction.reply('**Preset Commands**\n\n**View all presets: `/presets list`**\n**Create a preset: `/presets create`**\n**Delete a preset: `/presets delete`**\n**Run a preset: `/presets start`**')
			}

			//List
			if(interaction.options.getSubcommand() == "list") {
				if (db.getCollection(interaction.user.id) == null) {
					user = db.addCollection(interaction.user.id);
					
					interaction.reply('**You currently have no presets. Use `/presets commands` to view all preset commands**')
				}else{
					user = db.getCollection(interaction.user.id)

					if(user.data.length == 0) {
						interaction.reply('**You currently have no presets. Use `/presets commands` to view all preset commands**')
					}else{
						var response = "**Current Presets**\n\n"
						
						for(var i = 0; i < user.data.length; i++) {
							response += `**- ${user.data[i].tag}: ${user.data[i].minutes} minutes and ${user.data[i].seconds} seconds**\n`
						}

						interaction.reply(response)
					}
				}
			}
			
			//Create
			if(interaction.options.getSubcommand() == "create") {
				if(interaction.options.getNumber('minutes') == 0 && interaction.options.getNumber('seconds') == 0) {
					interaction.reply(`**Your preset must have a time!**`);
				}else{
					if (db.getCollection(interaction.user.id) == null) {
					user = db.addCollection(interaction.user.id);

					//No need to check if they have the preset already since they aren't even in the database
					user.insert({ tag: interaction.options.getString('tag'), minutes: interaction.options.getNumber('minutes'), seconds: interaction.options.getNumber('seconds')});
					db.saveDatabase();
					interaction.reply(`**Successfully created a preset timer with the tag "${interaction.options.getString('tag')}"**`)
				}else{
					user = db.getCollection(interaction.user.id)

					if(user.find({ tag: interaction.options.getString('tag') }).length == 0) {
						user.insert({ tag: interaction.options.getString('tag'), minutes: interaction.options.getNumber('minutes'), seconds: interaction.options.getNumber('seconds')});
					db.saveDatabase();
					interaction.reply(`**Successfully created a preset timer with the tag "${interaction.options.getString('tag')}"**`)
					}else{
						interaction.reply(`**You already have a preset timer with the same name**`)
					}
				}
				}
			}

			//Delete
			if(interaction.options.getSubcommand() == "delete") {
				if (db.getCollection(interaction.user.id) == null) {
					//They obviously don't have it since they aren't even in the database
					interaction.reply(`**You don't have a preset with that name!**`)
				}else{
					user = db.getCollection(interaction.user.id)

					if(user.find({ tag: interaction.options.getString('tag') }).length != 0) {
					user.remove(user.find({ tag: interaction.options.getString('tag') }));
					db.saveDatabase();
					interaction.reply(`**Successfully deleted preset with the tag "${interaction.options.getString('tag')}"**`)
					}else{
						interaction.reply(`**You don't have a preset with that name!**`)
					}
				}
			}

			//Start
			if(interaction.options.getSubcommand() == "start") {
				if (db.getCollection(interaction.user.id) == null) {
					//They obviously don't have it since they aren't even in the database
					interaction.reply(`**You don't have a preset with that name!**`)
				}else{
					user = db.getCollection(interaction.user.id)

					if(user.find({ tag: interaction.options.getString('tag') }).length != 0) {
						runTimer(interaction.user, interaction.channel, user.find({ tag: interaction.options.getString('tag') })[0].seconds, user.find({ tag: interaction.options.getString('tag') })[0].minutes, interaction.options.getString('ping'))

						interaction.reply(`**Your timer for ${user.find({ tag: interaction.options.getString('tag') })[0].minutes} minutes and ${interaction.channel, user.find({ tag: interaction.options.getString('tag') })[0].seconds} seconds has started. You will be notified once your timer ends.**`);
					}else{
						interaction.reply(`**You don't have a preset with that name!**`)
					}
				}
			}

		}
}