const Discord = require('discord.js');

const client = new Discord.Client();

var prefix = "/";

client.login(process.env.TOKEN);

client.on("ready",() => {
    console.log("Le bot est prêt !")
    client.user.setActivity("1 serveur", {type: "WATCHING"})
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
        .addField(prefix+"botinfo","Affiche les informations sur le bot")
        .addField(prefix+"deletewarns","Permet de retirer un certain nombre d'avertissements de l'utilisateur (requiert certaines permissions)")
        .addField(prefix+"eff","Permet de supprimer le nombre de messages précisé (requiert certaines permissions)")
        .addField(prefix+"kick","Permet d'expulser l'utilisateur mentionné (requiert certaines permissions)")
        .addField(prefix+"mute","Permet de mute l'utilisateur mentionné du salon (requiert certaines permissions)")
        .addField(prefix+"seewarns","Affiche la liste des avertissements de l'utilisateur (requiert certaines permissions)")
        .addField(prefix+"serveurinfo","Affiche les informations sur le serveur")
        .addField(prefix+"stats","Affiche les statistiques de l'utilisateur")
        .addField(prefix+"unmute","Permet d'unmute l'utilisateur mentionné (requiert certaines permissions)")
        .addField(prefix+"warn","Permet d'avertir l'utilisateur mentionné (requiert certaines permissions)")
        .setFooter("Menu d'aide - DM4bot")
        message.delete();
        message.author.send(affiche_aide)
        console.log("Quelqu'un a demandé la liste des commandes")
    }
    if(message.content === prefix + "botinfo"){
      if (message.channel.type === "dm") return;
        var affiche_botinfo = new Discord.RichEmbed()
        .setColor("#6699CC")
        .setTitle("Informations")
        .setDescription(`Voici les informations sur le bot **${client.user.username}**`)
        .addField(":robot: Nom du bot",`${client.user.username}`,true)
        .addField(":hash: Discriminateur du bot",`#${client.user.discriminator}`)
        .addField(":id: du bot",`${client.user.id}`)
        .setFooter("Menu d'infos sur le bot - DM4bot")
        message.delete();
        message.author.send(affiche_botinfo)
        console.log("Quelqu'un a recherché les informations sur le bot")
    }
    if(message.content === prefix + "serveurinfo"){
      if (message.channel.type === "dm") return;
        let servicon = message.guild.iconURL;
        var affiche_serveurinfo = new Discord.RichEmbed()
        .setColor("#6699CC")
        .setTitle("Informations")
        .setThumbnail(servicon)
        .setDescription(`Voici les informations sur le serveur **${message.guild.name}**`)
        .addField("Date de création",message.guild.createdAt)
        .addField("Date de joignement",message.member.joinedAt)
        .addField("Nombre de membres",message.guild.memberCount)
        .addField("Nombre de salons et de catégories",message.guild.channels.size)
        .setFooter("Menu d'infos sur le serveur - DM4bot")
        message.delete();
        message.author.send(affiche_serveurinfo)
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

    var fs = require('fs');
 
let warns = JSON.parse(fs.readFileSync("./warns.json", "utf8"));
 
if (message.content.startsWith(prefix + "warn")){
 
if (message.channel.type === "dm") return;
 
var mentionned = message.mentions.users.first();
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.author.send("**:x: Vous n'avez pas la permission d'exécuter la commande "+prefix+"warn !**").catch(console.error);
 
if(message.mentions.users.size === 0) {
 
  return message.author.send("**:x: Vous n'avez mentionné personne ou l'utilisateur mentionné n'existe pas !**");
 
}else{
 
    const args = message.content.split(' ').slice(1);
 
    const mentioned = message.mentions.users.first();
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size != 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
 
          if (args.slice(1).length != 0) {
 
            const date = new Date().toUTCString();
 
            if (warns[message.guild.id] === undefined)
 
              warns[message.guild.id] = {};
 
            if (warns[message.guild.id][mentioned.id] === undefined)
 
              warns[message.guild.id][mentioned.id] = {};
 
            const warnumber = Object.keys(warns[message.guild.id][mentioned.id]).length;
 
            if (warns[message.guild.id][mentioned.id][warnumber] === undefined){
 
              warns[message.guild.id][mentioned.id]["1"] = {"raison": args.slice(1).join(' '), time: date, user: message.author.id};
 
            } else {
 
              warns[message.guild.id][mentioned.id][warnumber+1] = {"raison": args.slice(1).join(' '),
 
                time: date,
 
                user: message.author.id};
 
            }
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
message.delete();
 
message.author.send(':warning: | **'+mentionned.tag+'** a été averti(e) !');
 
message.mentions.users.first().send(`:warning: | **${message.author.username}** vous a averti(e) depuis le serveur **${message.guild.name}**. Raison : `+ args.slice(1).join(' '))
 
          } else {
 
            message.author.send("**:x: Commande incorrecte. Utilisez "+prefix+"warn <utilisateur> <raison>**");
 
          }
 
        } else {
 
          message.author.send("**:x: Commande incorrecte. Utilisez "+prefix+"warn <utilisateur> <raison>**");
 
        }
 
      } else {
 
        message.author.send("**:x: Commande incorrecte. Utilisez "+prefix+"warn <utilisateur> <raison>**");
 
      }
 
    } else {
 
      message.author.send("**:x: Vous n'avez pas la permission d'exécuter la commande "+prefix+"warn !**");
 
    }
 
  }
 
}
 
 
 
  if (message.content.startsWith(prefix+"seewarns")||message.content===prefix+"seewarns") {
 
if (message.channel.type === "dm") return;
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.author.send("**:x: Vous n'avez pas la permission d'utiliser la commande "+prefix+"seewarns !**").catch(console.error);
 
    const mentioned = message.mentions.users.first();
 
    const args = message.content.split(' ').slice(1);
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size !== 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
 
          try {
 
            if (warns[message.guild.id][mentioned.id] === undefined||Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
 
              message.author.send("**"+mentioned.username+"** n'a jamais été averti(e).");
 
              return;
 
            }
 
          } catch (err) {
 
            message.author.send("**"+mentioned.username+"** n'a jamais été averti(e).");
 
            return;
 
          }
 
          let arr = [];
 
          arr.push(`**${mentioned.username}** a **`+Object.keys(warns[message.guild.id][mentioned.id]).length+"** avertissement(s) :");
 
          for (var warn in warns[message.guild.id][mentioned.id]) {
 
            arr.push(`**${warn}** - **"`+warns[message.guild.id][mentioned.id][warn].raison+
 
            "\"** donné par **"+message.guild.members.find("id", warns[message.guild.id][mentioned.id][warn].user).user.tag+"** le **"+warns[message.guild.id][mentioned.id][warn].time+"**");
 
          }
 
          message.author.send(arr.join('\n'));
 
        } else {
 
          message.author.send("**:x: Commande incorrecte. Utilisez "+prefix+"seewarns <utilisateur>**");
 
          console.log(args);
 
        }
 
      } else {
 
        message.author.send("**:x: Commande incorrecte. Utilisez "+prefix+"seewarns <utilisateur>**");
 
      }
 
    } else {
 
      message.author.send("**:x: Commande incorrecte. Utilisez "+prefix+"seewarns <utilisateur>**");
 
    }
 
  }
 
 
 
 
 
  if (message.content.startsWith(prefix+"deletewarns")||message.content===prefix+"deletewarns") {
 
if (message.channel.type === "dm") return;
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.author.send("**:x: Vous n'avez pas la permission d'utiliser la commande "+prefix+"deletewarns !**").catch(console.error);
 
   const mentioned = message.mentions.users.first();
 
    const args = message.content.split(' ').slice(1);
 
    const arg2 = Number(args[1]);
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size != 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">"){
 
          if (!isNaN(arg2)) {
 
            if (warns[message.guild.id][mentioned.id] === undefined) {
 
              message.author.send("**"+mentioned.username+"** n'a aucun avertissement.");
 
              return;
 
            } if (warns[message.guild.id][mentioned.id][arg2] === undefined) {
 
              message.author.send("**:x: Cet avertissement n'existe pas !**");
 
              return;
 
            }
 
            delete warns[message.guild.id][mentioned.id][arg2];
 
            var i = 1;
 
            Object.keys(warns[message.guild.id][mentioned.id]).forEach(function(key){
 
              var val=warns[message.guild.id][mentioned.id][key];
 
              delete warns[message.guild.id][mentioned.id][key];
 
              key = i;
 
              warns[message.guild.id][mentioned.id][key]=val;
 
              i++;
 
            });
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
            if (Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
 
              delete warns[message.guild.id][mentioned.id];
 
            }
 
            message.author.send(`L'avertissement **${args[1]}** de **${mentioned.username}** a été retiré avec succès !`);
 
            return;
 
          } if (args[1] === "tout") {
 
            delete warns[message.guild.id][mentioned.id];
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
            message.author.send(`Tous les avertissements de **${mentioned.username}** ont été retirés avec succès !`);
 
            return;
 
          } else {
 
            message.author.send("**:x: Commande incorrecte. Utilisez "+prefix+"deletewarns <utilisateur> <nombre>**");
 
          }
 
        } else {
 
          message.author.send("**:x: Commande incorrecte. Utilisez "+prefix+"deletewarns <utilisateur> <nombre>**");
 
        }
 
      } else {
 
        message.author.send("**:x: Commande incorrecte. Utilisez "+prefix+"deletewarns <utilisateur> <nombre>**");
 
      }
 
    } else {
 
      message.author.send("**:x: Vous n'avez pas la permission d'exécuter la commande "+prefix+"deletewarns !**");
 
    }
 
  }
});
