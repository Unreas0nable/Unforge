const Discord = require('discord.js');
const botsettings = require('./botsettings.json');

const bot = new Discord.Client({autoReconnect:true});

var prefix = botsettings.prefix;

bot.on("ready", async () => {
    console.log(`I have completed booting up, my name is ${bot.user.username}`);
    //console.log(bot.commands);
    try {
        let link = await bot.generateInvite(["ADMINISTRATOR"]);
        console.log(link);
    } catch(e) {
        console.log(e.stack);
    }
})

//bot.on('message', (msg) => {
//console.log(`${msg.author.username} sent a message in #${msg.channel.name} | Server Name: ${msg.guild.name} | ${new Date()} | " ${msg} "`);
//})

bot.on("ready",() => {
//  bot.channels.get('333788725136064512').send(`Hello there! I am ${bot.user.username}!`);
})
// commands
bot.on("message", function(message) {

    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "help":
message.delete();
var embed = new Discord.RichEmbed()
  .setTitle('Help Menu')
  .addField('ping', `Do not "pong" the bot!`, true)
  .setFooter('End of Menu')
message.author.sendEmbed(embed);

  break;

  default:
    message.reply("invalid argument, meaning it is not a command! Please type `ub?help` to execute the help menu!");

    case "ping":
        //console.log(`Pong! ${bot.ping} ms`);
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.sendMessage("You do not have admin!");
        message.delete();
        var embed = new Discord.RichEmbed()
        .addField('Pong!', `${bot.ping} ms`, true)
        .setTimestamp(new Date())
        message.channel.sendEmbed(embed);
        //console.log(`Pong! Latency is ${bot.ping} ms.`);

    break;
//Dangerous commands
    case "kick":
        //console.log(`${member.user.tag} has been kicked by ${msg.author.username}`)
    message.delete();
    var user = message.mentions.users.first();

    if (message.mentions.users.size < 1) return message.reply("You must mention a user!").catch(console.error);

    if (!message.guild.member(user).kickable) return message.reply("I cannot kick that user..");
    message.guild.member(user).kick();

    var embed = new Discord.RichEmbed()
    .setTitle(`Member Kicked \n`)
    .setDescription('ub?kick')
    .addField('User:', args.join(" ").substring(5), false)
    .addField('Command used by:', `<@${message.author.id}>`, false)
    .setTimestamp(new Date())
    bot.channels.find("name", "audits").sendEmbed(embed);

    break;

    case "forcekick":

    var user = message.mentions.users.first();

    if (message.mentions.users.size < 1) return message.reply("You must mention a user!").catch(console.error);

    message.guild.member(user).kick();

        var embed = new Discord.RichEmbed()
        .setTitle(`Member Force Kicked \n`)
        .setDescription('ub?kick')
        .addField('User:', args.join(" ").substring(10), false)
        .addField('Command used by:', `<@${message.author.id}>`, false)
        .setTimestamp(new Date())
        bot.channels.find("name", "audits").sendEmbed(embed);

        break;

        case "ban":
            //console.log(`${member.user.tag} has been kicked by ${msg.author.username}`)
        message.delete();
        var user = message.mentions.users.first();

        if (message.mentions.users.size < 1) return message.reply("You must mention a user!").catch(console.error);

        if (!message.guild.member(user).bannable) return message.reply("I cannot ban that user..");
        message.guild.member(user).ban();

        var embed = new Discord.RichEmbed()
        .setTitle(`Member Banned \n`)
        .setDescription('ub?ban')
        .addField('User:', args.join(" ").substring(5), false)
        .addField('Command used by:', `<@${message.author.id}>`, false)
        .setTimestamp(new Date())
        bot.channels.find("name", "audits").sendEmbed(embed);

        break;

        case "forceban":

        message.delete()

        var user = message.mentions.users.first();

        if (message.mentions.users.size < 1) return message.reply("You must mention a user!").catch(console.error);

        message.guild.member(user).ban();

            var embed = new Discord.RichEmbed()
            .setTitle(`Member Force Banned \n`)
            .setDescription('ub?ban')
            .addField('User:', args.join(" ").substring(10), false)
            .addField('Command used by:', `<@${message.author.id}>`, false)
            .setTimestamp(new Date())
            bot.channels.find("name", "audits").sendEmbed(embed);

            break;

      case "unban":

      if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.sendMessage("You do not have admin!");
        var user = args[0];
        if (!user) return message.reply('You must supply a `User Resolvable`, such as a `user id.`').catch(console.error);
            message.delete();
            message.guild.unban(user);
            //message.channel.send("**" + "<@" + args.join(" ").substring(0) + ">" +  "'s ban has been lifted**")

            var embed = new Discord.RichEmbed()
            .setTitle(`Member Unbanned \n`)
            .setDescription('ub?unban')
            .addField('User:', args.join(" ").substring(6), false)
            .addField('Command used by:', `<@${message.author.id}>`, false)
            .setTimestamp(new Date())
            bot.channels.find("name", "audits").sendEmbed(embed);

//end of Dangerous commands
        break;

  }
})
// Welcome / Goodbye Members

bot.on ('guildDelete', guild => {
  console.log(`I have left ${msg.guild.name} at ${new Date()}`);
})

bot.on ('guildMemberAdd', member => {
  let guild = member.guild;
  //var channel = bot.channels.find("name", "join-leave");
  bot.channels.find("name", "join-leave").send(`<@${member.user.id}> has joined ${guild.name}`);
     bot.channels.find("name", "general-chat").send(`Everyone, please welcome ${member.user.username} to the server!\n
     <@${member.user.id}> please go to <#333986967215669248> to get your rank in ${guild.name}!`);

     var embed = new Discord.RichEmbed()
     .setTitle(`Member Joined \n`)
     .addField('User:', `<@${member.user.id}>`, true)
     //.addField('Command used by:', `<@${message.author.id}>`, true)
     .setTimestamp(new Date())
     bot.channels.find("name", "audits").sendEmbed(embed);
})

bot.on('guildMemberRemove', member => {
  let guild = member.guild;
  console.log(`${member.user.username} has left ${guild.name}`);
  bot.channels.find("name", "join-leave").send(`<@${member.user.id}> has left ${guild.name} \n\
    Forget you, ${member.user.username}!`);

    var embed = new Discord.RichEmbed()
    .setTitle(`Member left \n`)
    .addField('User:', `<@${member.user.id}>`, false)
    //.addField('Command used by:', `<@${message.author.id}>`, true)
    .setTimestamp(new Date())
    bot.channels.find("name", "audits").sendEmbed(embed);
})

bot.login(botsettings.token);
