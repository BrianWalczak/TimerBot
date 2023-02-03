const { ShardingManager } = require('discord.js');
const config = require('./config.json');
const token = config.token;



let manager = new ShardingManager('./main.js', {
	token: token,
	totalShards: 'auto',
});

manager.on('shardCreate', async (shard) => {
  console.log(`[SHARDS]: Launched shard ${shard.id}`)
	
  shard.on('error', (error) => {
     console.error(error)
  })
})

function catcherror(e) {
	console.log(e)
}

//Handle errors
process.on("uncaughtException", e => { catcherror(e) })
process.on("unhandledRejection", e => { catcherror(e) })
process.on("uncaughtExceptionMonitor", e => { catcherror(e) })

manager.spawn();
