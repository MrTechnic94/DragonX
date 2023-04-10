'use strict';

const { MessageEmbed } = require('discord.js');
const { Player } = require('discord-player');

exports.run = async (client, message) => {

    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("RED")]});

    const track = queue.current;
    const timestamp = queue.getPlayerTimestamp();
    const trackDuration = timestamp.progress ==  'Forever' ? 'Endless (Live)' : track.duration;
    const progress = queue.createProgressBar({ timecode: false });
    const embed = new MessageEmbed()
    .setThumbnail(track.thumbnail)
    .setTitle(`⚡ Teraz Odtwarzam:`)
    .setDescription(`**Tytuł:** ${track.title}\n**Poziom głośności:** ${queue.volume}%\n**Na prośbę:** ${track.requestedBy}\n\n${progress} [\`\`${track.duration}\`\`] 🔊`)
	.setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
    .setColor("6b3deb")

    return message.reply({embeds: [embed]})

};

exports.info = {
    name: "nowplaying",
    aliases: ['np']
}