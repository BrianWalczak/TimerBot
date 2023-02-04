const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const client = new Client({intents: [GatewayIntentBits.Guilds]});
const { readdirSync } = require("fs")
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const config = require('./config.json');
const token = config.token;
client.commands = new Collection()
const rest = new REST().setToken(token);
const commands = [];

// ================= START BOT CODE ===================

//Handlers
readdirSync('./src/commands').forEach(file => {
  const command = require(`./src/commands/${file}`);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
})

readdirSync('./src/events').forEach(file => {
	const event = require(`./src/events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
})

//Bot is ready
client.on("ready", () => {
	//Add commands
	try {
		(async () => {
		await rest.put(Routes.applicationCommands(client.user.id), { body: commands });
		})();
		console.log(`[SHARDS]: Successfully launched shard`)
	} catch (error) {
		console.error(error);
	}
})


function catcherror(e) {
	console.log(e)
}

//Handle errors
process.on("uncaughtException", e => { catcherror(e) })
process.on("unhandledRejection", e => { catcherror(e) })
process.on("uncaughtExceptionMonitor", e => { catcherror(e) })


client.login(token)
