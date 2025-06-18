const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    process.on('message', async (msg) => {
        const type = msg.type;
        let messenger;

        if(type === 'channel') {
            messenger = await client.channels.fetch(msg.id).catch(() => null);
        } else if(type === 'user') {
            messenger = await client.users.fetch(msg.id).catch(() => null);
        } else {
            return;
        }

        if(messenger) {
            try {
                messenger.send({
                    content: msg.content || '',
                    embeds: msg.embeds ? msg.embeds.map(data => EmbedBuilder.from(data)) : [],
                    components: msg.components || []
                });
            } catch (error) {};
        }
    });
  }
};