const Discord = require('discord.js');
const bot = new Discord.Client();

var prefix = ("/")

bot.on('ready', function() {
    bot.user.setGame("vous aider");
    console.log("Le bot est prêt !");
});

bot.login(process.env.TOKEN);

bot.on('message', message => {
    if (message.content === prefix + "aide") {
        message.channel.sendMessage("Liste des commandes");
    }

    if(message.content === prefix + "info") {
        message.reply("Liste des infos");
        console.log("Le bot dit les infos");
    }
});
