const {MessageEmbed} = require('discord.js');
const { QueueRepeatMode } = require('discord-player');
const {getVoiceConnection} = require('@discordjs/voice');

exports.run = async (client, message) => {

    const queue = client.player.getQueue(message.guild.id);
    const connection = getVoiceConnection(message.guild.id)

    // if(!connection) return message.reply({embeds:[new MessageEmbed().setDescription(`❌ **Nie ma mnie na żadnym kanale głosowym!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("RED")]});

    if(!queue || !queue.playing) return message.reply({embeds:[new MessageEmbed().setDescription(`❌ **Nie ma żadnej puszczonej piosenki!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("RED")]});

    if(queue.repeatMode === 2) return message.reply({embeds:[new MessageEmbed().setDescription(`❌ **Muzyka jest już zaloopowana!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("RED")]});

    queue.setRepeatMode(QueueRepeatMode.QUEUE);
    const track = queue.current
    return message.reply({embeds:[new MessageEmbed().setTitle("🔄 Powtarzanie piosenek").setDescription(`**Powtarzasz piosenkę:** \`\`${track.title}\`\` `).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("6b3deb")]});

};

exports.info = {
    name: "loop"
}