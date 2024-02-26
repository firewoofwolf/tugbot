const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
process.on('SIGINT', () => {
  console.log('Shutting down bot...');
  client.destroy();
});
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

var score = 4;

client.on('messageCreate', (message) => {
  if (message.author.bot) { return; }
  let line="";
  
  if (message.content.toLowerCase() == '!starttug') {
    score = 4;
    message.reply(`${message.author.username} started a tug-of-war match`);

    for (let i=0; i<9; i++) {
      if (i===score) { line+='#' }
      else { line+='-' }
    }
    message.reply(line);
  }

  if (message.content.toLowerCase() == '!pull') {
    score++;
    message.reply(`${message.author.username} pulled left!`)
    for (let i=0; i<9; i++) {
      if (i===score) { line+='#' }
      else { line+='-' }
    }
    message.reply(line);
    

  } else if (message.content.toLowerCase() == '?pull') {
    score--;
    message.reply(`${message.author.username} pulled right!`)
    for (let i=0; i<9; i++) {
      if (i===score) { line+='#' }
      else { line+='-' }
    }
    message.reply(line);
  }

  score == -1 ? message.reply("Player 1 Won!") : score == 9 ? message.reply("Player 2 Won!") : null;
});

client.login(BOT_TOKEN);
