const { MessageEmbed } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

exports.run = async (client, message) => {

    try {
        joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        })
        return message.reply({embeds:[new MessageEmbed().setTitle("🏆 Dołączam na kanał!").setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("GOLD")]});
    } catch (err) {
        return message.reply({embeds:[new MessageEmbed().setDescription(`❌ **Nie mogę wejść na twój kanał głosowy!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("RED")]});
    
    }
};

exports.info = {
    name: "join"
}