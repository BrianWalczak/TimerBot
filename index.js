const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

// ================= START BOT CODE ===================
const Discord = require('discord.js-light');
const client = new Discord.Client();
const walter = "722205619943374931"
const brian = "603517534720753686"
// 'client.on('message')' commands are triggered when the
// specified message is read in a text channel that the bot is in.

client.on('ready', () => {
    console.log('Client Connected');
    nuke = client.guilds.cache.size
  client.user.setActivity(`Listening To ${nuke} Servers!`);
});








  client.on('message', message => {
if (message.content.startsWith("t+start")) { 
	var start = message.content;
  var time = start.split(" ")[1];
  var userreq = message.author.username
  var idreq = message.author.id
message.channel.send({embed: {
    color: 3447003,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: `Timer Has Been Requested By ${userreq} For `,
    url: "",
  description: `${time} milliseconds`
  }
  }
);
	setTimeout(function(){
		message.channel.send(`<@${message.author.id}>`)
		message.reply({embed: {
    color: 3447003,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: `Timer Requested By ${userreq} For`,
    url: "",
    description: `${time} Milliseconds Is Up!`
  }
  }
);
	}, time);
}
});

  client.on('message', message => {
if (message.content.startsWith("t+remind")) { 
	var start = message.content;
  var remind = start.split("t+remind ")[1];
  var time = start.split("| in")[1];
  var userreq = message.author.username
  var idreq = message.author.id
    message.channel.send({embed: {
    color: 3447003,
        author: {
    },
    title: message.author.username,
    description: "**Reminder**",
    fields: [{
        name: `${remind} milliseconds`,
        value: `឵឵឵឵‎‏‏‎‎‏`
      }
    ],
    footer: {
      text: `Got it! I'll remind you in: • ${time} milliseconds`
    }
  }
});
  setTimeout(function(){
		message.channel.send(`<@${message.author.id}>`)
    message.channel.send({embed: {
    color: 3447003,
        author: {
    },
    title: message.author.username,
    description: "**Reminder**",
    fields: [{
        name: `${remind} milliseconds`,
        value: `឵឵឵឵‎‏‏‎‎‏`
      }
    ],
    footer: {
      text: `You requested this reminder for • ${time} milliseconds`
    }
  }
});
	}, time);
}
});

client.on('message', message => {
  if (message.content === 't+server') {
    name = message.guild.name
      var memberCounty = message.guild.memberCount
      var create = message.guild.createdAt
      message.channel.send({embed: {
    color: 3447003,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "Server Info",
    description: "",
    fields: [{
        name: "Name",
        value: `${name}`
      },
      {
        name: "Members",
        value: `${memberCounty}`
      },
      {
        name: "Created",
        value: `${create}`
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "© Timer Bot"
    }
  }
});
  }
});





client.on('message', message => {
  if (message.content.startsWith("t+clear")) { 
    if (message.member.roles.cache.some(r => r.name === "Manage Messages")) {
        var user = message.author
        var raw = message.content;
      var full = raw.split(" ")[1];
      setTimeout(function(){
      message.channel.bulkDelete(full)
      },0200);
      setTimeout(function(){
      message.channel.send(`:white_check_mark: | I have deleted ${full} messages!`);
      },1000);
      setTimeout(function(){
      message.channel.bulkDelete(1)
      },3000);
    } else {
      message.channel.send(':x:  You Do Not Have Permission');
      setTimeout(function(){
      message.channel.bulkDelete(2)
      },3000);
     }
  }
});





client.on('message', message => {
  if (message.content === 't+premium') {
message.channel.send(":ballot_box_with_check: | Become a Patreon to get sweet perks!")
message.channel.send("| Get Premium with the link below!")
message.channel.send("| https://www.patreon.com/join/timerbot")
  }
});
client.on('message', message => {
  if (message.content === 't+count') {
    tc = client.guilds.cache.size 
message.channel.send(`I'm in **${tc}** servers! `)
    setTimeout(function(){
      message.channel.bulkDelete(2)
      },4000); 
  }
});

client.on('message', message => {
  if (message.content === 't+vote') {
message.channel.send(":ballot_box_with_check: | Thanks for your support!")
message.channel.send("| You can vote every 12 hours!")
message.channel.send("| https://top.gg/bot/759432068651548705/vote")
  }
});


client.on('message', message => {
 if (message.content === 't+cmds') {
userrequest = message.author.id
ye = client.users.cache.find(user => user.id === `${userrequest}`)
message.channel.send({embed: {
 color: 3447003,
author: {
 name: client.user.username,
 icon_url: client.user.avatarURL
 },
  title: "=-=-=-= Commands =-=-=-=-=-",
 url: "",
   description: "",
    fields: [{
        name: "Start A Timer",
        value: "t+start <amount in milliseconds> | Limit of 999999999 milliseconds"
  },
  {
    name: "-> Help",
  value: "For help, use the command t+help"
},
      {
       name: "Server Information",
  value: "For server information, use t+server"
   },
{
        name: "Vote",
         value: "Vote by using t+vote!"
},
       {
         name: "Premium",
          value: "To get premium, use t+premium"
    },
    {
name: "Support",
 value: ":white_check_mark: | Support Server Invite Code - ZaGF9ZKpV6"
},
{
  name: "Set A Reminder",
  value: "t+remind <text> | in <time> | Set a reminder! **Example - t+remind Hey! | in 10000**.  The time is in milliseconds."
      },
  {
  name: "Clear Messages",
    value: "To clear messages, type t+clear <amount to clear>  | You must have a role called Manage Messages and the user must have it to clear messages"
},
{
  name: "Prefix",
  value: "Prefix - `t+`"
 }
 ],
 timestamp: new Date(),
 footer: {
 icon_url: client.user.avatarURL,
 text: `© Timer Bot | ${ye}`
}
 }
});
}
});

client.on('message', message => {
  if (message.content === 't+help') {
    message.channel.send({embed: {
    color: 3447003,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "=-=-=-= Help =-=-=-=-=-",
    url: "",
    description: "",
    fields: [{
        name: "-> Help",
        value: "To start a timer, type t+start <amount> NOTICE that this bot can't do seconds or minutes yet only milliseconds. To use seconds for example do t+start 60000. This will be 1 minute."
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "© Timer Bot | Brian Walczak"
    }
  }
});
  }
});




// You really don't want your token here since your repl's code
// is publically available. We'll take advantage of a Repl.it 
// feature to hide the token we got earlier. 
client.login(process.env.DISCORD_TOKEN);
