const { EmbedBuilder } = require('discord.js');
const { getEvents } = require('./db.js');
const chalk = require('chalk');

async function startDatabase(manager) {
    setInterval(async () => {
        const now = Date.now();
        
        const events = await getEvents();
        const expiredEvents = events.find({ endTime: { '$lte': now } });
        if(expiredEvents.length === 0) return;
                
        for (const event of expiredEvents) {
            const ping = event.ping ?? `<@${event.userId}>`;
            const embed = new EmbedBuilder()
                .addFields({ name: "📣 Ping", value: ping, inline: true })
                .setColor(0x5865F2)
                .setTimestamp();

            if(event.type === 'timer') {
                embed.setTitle(`🔔 Timer Finished`);
                embed.setDescription(`Your timer for \`${event.timeString}\` has ended on <t:${Math.floor(Date.now() / 1000)}:f>.`);
            } else if(event.type === 'alarm') {
                embed.setTitle(`⏰ Alarm Finished`);
                embed.setDescription(`Your alarm set for <t:${Math.floor(event.endTime / 1000)}:f> has ended.`);
            } else if(event.type === 'reminder') {
                embed.setTitle(`💡 ${event.title}`);
                embed.setDescription(`Your reminder set for <t:${Math.floor(event.endTime / 1000)}:f> is due!`);
                            
                embed.addFields({ name: "📜 Description", value: event.desc || "No description provided.", inline: false });
            }

            for (const shard of manager.shards.values()) {
                shard.send({
                    type: 'channel',
                    method: 'cache',
                    id: event.channelId,
                    content: `||${ping}||`,
                    embeds: [embed.toJSON()]
                });
            }
                
            events.remove(event);
        }
    }, 1000);

    console.log(`${chalk.blue('[DATABASE UPDATE]')} Successfully loaded the database event listener.`);
}

module.exports = startDatabase;