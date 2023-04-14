const {MessageEmbed} = require('discord.js');
const { Player } = require('discord-player');
const {getVoiceConnection} = require('@discordjs/voice');

exports.run = async (client, message) => {

    const connection = getVoiceConnection(message.guild.id)
    const queue = client.player.getQueue(message.guild.id);

    // if(!connection) return message.reply({embeds:[new MessageEmbed().setDescription(`❌ **Nie ma mnie na żadnym kanale głosowym!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("RED")]});

    if(!queue || !queue.playing) return message.reply({embeds:[new MessageEmbed().setDescription(`❌ **Nie ma żadnej puszczonej piosenki!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("RED")]});

    const success = queue.setPaused(false);

    return message.reply({embeds:[new MessageEmbed().setTitle(`🔊 Wznowiłeś odtwarzanie piosenki`).setDescription(`**Wznowiłeś odtwarzanie piosenki** \`\`${queue.current.title}\`\` `).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("6b3deb")]});

};

exports.info = {
    name: "resume"
}