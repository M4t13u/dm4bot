const Discord = require('discord.js');

const client = new Discord.Client();

var prefix = "/";

client.login(process.env.TOKEN);

client.on("ready",() => {
    console.log("Le bot est prêt !")
    client.user.setActivity("vous aider")
});

client.on ('message',message => {
    if(message.content === prefix + "aide"){
      if (message.channel.type === "dm") return;
        var affiche_aide = new Discord.RichEmbed()
        .setColor("#6699CC")
        .setTitle("Liste des commandes")
        .setDescription("Voici la liste complète des commandes exécutables")
        .addField(prefix+"aide","Affiche la liste des commandes")
        .addField(prefix+"ban","Permet de bannir l'utilisateur mentionné (requiert certaines permissions)")
        .addField(prefix+"deletewarns","Permet de retirer un certain nombre d'avertissements de l'utilisateur (requiert certaines permissions)")
        .addField(prefix+"eff","Permet de supprimer le nombre de messages précisé (requiert certaines permissions)")
        .addField(prefix+"info","Affiche les informations sur le serveur et sur le bot")
        .addField(prefix+"kick","Permet d'expulser l'utilisateur mentionné (requiert certaines permissions)")
        .addField(prefix+"mute","Permet de mute l'utilisateur mentionné du salon (requiert certaines permissions)")
        .addField(prefix+"seewarns","Affiche la liste des avertissements de l'utilisateur (requiert certaines permissions)")
        .addField(prefix+"stats","Affiche les statistiques de l'utilisateur")
        .addField(prefix+"unmute","Permet d'unmute l'utilisateur mentionné (requiert certaines permissions)")
        .addField(prefix+"warn","Permet d'avertir l'utilisateur mentionné (requiert certaines permissions)")
        .setFooter("Menu d'aide - M4t13uBot")
        message.delete();
        message.author.send(affiche_aide)
        console.log("Quelqu'un a demandé la liste des commandes")
    }
    if(message.content === prefix + "info"){
      if (message.channel.type === "dm") return;
        var affiche_info = new Discord.RichEmbed()
        .setColor("#6699CC")
        .setTitle("Informations")
        .setDescription(`Voici les informations sur le serveur **${message.guild.name}** et sur **${client.user.username}**`)
        .addField(":robot: Nom du bot",`${client.user.username}`,true)
        .addField(":hash: Discriminateur du bot",`#${client.user.discriminator}`)
        .addField(":id: du bot",`${client.user.id}`)
        .addField("Nombre de membres",message.guild.members.size)
        .addField("Nombre de salons et de catégories",message.guild.channels.size)
        .setFooter("Menu d'infos - M4t13uBot")
        message.delete();
        message.author.send(affiche_info)
        console.log("Quelqu'un a recherché les informations sur le serveur")
    }
    if(message.content.startsWith(prefix + "kick")){
      if (message.channel.type === "dm") return;
      message.delete();
        if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.author.send("**:x: Vous n'avez pas la permission d'exécuter la commande "+prefix+"kick !**");
        if(message.mentions.users.size === 0) {
            return message.author.send("**:x: Vous n'avez mentionné personne ou l'utilisateur mentionné n'existe pas !**")
        }
        var kick = message.guild.member(message.mentions.users.first());
        if(!kick) {
            return message.author.send("**:x: Vous n'avez mentionné personne ou l'utilisateur mentionné n'existe pas !**")
        }
        if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")){
            return message.author.send("**:x: Je n'ai pas la permission d'exécuter la commande "+prefix+"kick !**");
        }
        kick.kick().then(member => {
            message.channel.send(`**${member.user.username}** a été expulsé(e) du serveur par **${message.author.username}**.`);
        });
    }
    if(message.content.startsWith(prefix + "ban")){
      if (message.channel.type === "dm") return;
      message.delete();
        if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.author.send("**:x: Vous n'avez pas la permission d'exécuter la commande "+prefix+"ban !**");
        if(message.mentions.users.size === 0) {
            return message.author.send("**:x: Vous n'avez mentionné personne ou l'utilisateur mentionné n'existe pas !**")
        }
        var ban = message.guild.member(message.mentions.users.first());
        if(!ban) {
            return message.author.send("**:x: Vous n'avez mentionné personne ou l'utilisateur mentionné n'existe pas !**")
        }
        if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")){
            return message.author.send("**:x: Je n'ai pas la permission d'exécuter la commande "+prefix+"ban !**");
        }
        ban.ban().then(member => {
            message.channel.send(`**${member.user.username}** a été banni(e) du serveur par **${message.author.username}**.`);
        });
    }
    if(message.content.startsWith(prefix + "eff")){
      if (message.channel.type === "dm") return;
      message.delete();
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGE")) return message.author.send("**:x: Vous n'avez pas la permission d'exécuter la commande "+prefix+"eff !**");
        let args = message.content.split(" ").slice(1);
        if(!args[0]) return message.author.send("**:x: Vous n'avez pas précisé le nombre de messages à supprimer !**")
        message.channel.bulkDelete(args[0]).then(() => {
          message.author.send(`**${args[0]}** messages ont été supprimés dans le salon **${message.channel.name}** du serveur **${message.guild.name}** !`);
        })
    }
    if(message.content.startsWith(prefix + "mute")){
      if (message.channel.type === "dm") return;
      message.delete();
        if(!message.guild.member(message.author).hasPermission("MUTE_MEMBERS")) return message.author.send("**:x: Vous n'avez pas la permission d'exécuter la commande "+prefix+"mute !**");
        if(message.mentions.users.size === 0){
            return message.author.send("**:x: Vous n'avez mentionné personne ou l'utilisateur mentionné n'existe pas !**");
        }
        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.author.send("**:x: Vous n'avez mentionné personne ou l'utilisateur mentionné n'existe pas !**");
        }
        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.author.send("**:x: Je n'ai pas la permission d'exécuter la commande "+prefix+"mute !**");
        message.channel.overwritePermissions(mute,{ SEND_MESSAGES: false}).then(member => {
            message.channel.send(`**${mute.user.username}** a été mute du salon par **${message.author.username}**.`);
        })
    }
    if(message.content.startsWith(prefix + "unmute")){
      if (message.channel.type === "dm") return;
      message.delete();
        if(!message.guild.member(message.author).hasPermission("MUTE_MEMBERS")) return message.author.send("**:x: Vous n'avez pas la permission d'exécuter la commande "+prefix+"unmute !**");
        if(message.mentions.users.size === 0){
            return message.author.send("**:x: Vous n'avez mentionné personne ou l'utilisateur mentionné n'existe pas !**");
        }
        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.author.send("**:x: Vous n'avez mentionné personne ou l'utilisateur mentionné n'existe pas !**");
        }
        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.author.send("**:x: Je n'ai pas la permission d'exécuter la commande "+prefix+"unmute !**");
        message.channel.overwritePermissions(mute,{ SEND_MESSAGES: true}).then(member => {
            message.channel.send(`**${mute.user.username}** a été unmute du salon par **${message.author.username}**.`);
        })
    }
    if(!message.content.startsWith(prefix)) return;
    if (message.channel.type === "dm") return;
    message.delete();
    var args = message.content.substring(prefix.length).split(" ");
    switch (args[0].toLowerCase()){
        case "stats":
        var userCreateDate = message.author.createdAt.toString(" ").split(" ");
        var msgauthor = message.author.id;
        var affiche_stats = new Discord.RichEmbed()
        .setColor("#6699CC")
        .setTitle(`Statistiques de ${message.author.username}`)
        .setThumbnail(message.author.avatarURL)
        .addField(`:id: de l'utilisateur : `, msgauthor,true)
        .addField("::clock1030: Date de création : ", userCreateDate[2] + ' ' + userCreateDate[1] + ' ' + userCreateDate[3])
        message.author.send({embed: affiche_stats});
        break;
    }
});
