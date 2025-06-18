const path = require('path');

const IPCListener = {
  sendMessage(shard, message) {
    shard.send(message);
  },

  async getMessage(shard, message) {
    try {
      const filePath = path.join(__dirname, 'libs', message.file);
      const mod = require(filePath);
      let data;

      if(message.func != null && message.args != null) {
        if (typeof mod[message.func] !== 'function') {
            return this.sendMessage(shard, {
                type: 'response',
                id: message.id,
                data: null
            });
        }

        data = await mod[message.func](...message.args);
      } else if (message.variable != null) {
        if (typeof mod[message.variable] === 'undefined') {
            return this.sendMessage(shard, {
              type: 'response',
              id: message.id,
              data: null
            });
        }

        if (message.value != null) {
          mod[message.variable] = message.value;
        }

        data = mod[message.variable];
      }

      this.sendMessage(shard, {
        type: 'response',
        id: message.id,
        data
      });
    } catch (error) {
      this.sendMessage(shard, {
        type: 'response',
        id: message.id,
        data: null
      });
    }
  }
};

module.exports = { IPCListener };