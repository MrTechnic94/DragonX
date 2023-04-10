const Discord = require('discord.js');
const fs = require('fs')
const ms = require('ms')
const moment = require('moment-timezone')
require('dotenv').config({ path: __dirname + '../../.env' })

const Timeout = new Discord.Collection();

exports.run = async (client, message) => {

    if(message.author.bot) return;
    if(message.channel.type == "DM") return;

    const prefix = process.env.PREFIX;

    if(message.content.indexOf(prefix) !== 0) return;
    const args = message.content
      .slice(prefix.length)
      .trim() 
      .split(/ +/g);
  
    const command = args.shift().toLowerCase();
    const cmd =
      client.commands.get(command) ||
      client.commands.get(client.aliases.get(command));

      if(!cmd) return
      function errorMessage(txt, member) {
        const embed_err = new Discord.MessageEmbed()
          .setTitle("ERROR!")
          .setAuthor(member.tag, member.displayAvatarURL({ dynamic: true }))
          .setColor('RED')
          .setDescription(txt)
          .setFooter(`${config.embedy.nazwa} - System`, client.user.displayAvatarURL({ dynamic: true }))
          .setTimestamp();
    
        return message.channel.send({embeds: [embed_err]});
      }
    
      if(cmd.info.perm && message.guild && !cmd.info.DM){
      
        if(!message.member.permissions.has(cmd.info.perm)) {
            message.delete()
            const ydhp = new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
                .setColor('RED')
                .setDescription("❌ Nie posiadasz permisji by to zrobić!")
                .setFooter(client.user.username + " System", client.user.avatarURL())

            console.log(`[CommandsManager] Użytkownik ${message.author.id} (${message.author.tag}) chciał wykonać komende ${cmd.info.name} (guild: ${message.guild.id})`);
            return message.channel.send({embeds: [ydhp]}).then(m => m.delete({timeout: 5000}));
        }
      }

       if(cmd.info.stop === true) return

    try {
        cmd.run(client, message, args);
      } catch (err) {
        const embederr = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setColor("RED")
            .setDescription('```' + cmd.info.name + ' ERROR!:\n' + err +'```')
            .setFooter(client.user.username + " System", client.user.avatarURL())

        console.log(`[CommandsManager] Podczas wykonywania komendy ${cmd.info.name} wystąpił błąd \n${err}`);
        return message.channel.send(embederr)

    }
};