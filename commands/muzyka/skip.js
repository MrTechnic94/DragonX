'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message) => {

    const queue = client.player.nodes.get(message.guild.id);
    
    if (!queue || !queue.isPlaying()) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("Red")]});

    if (!queue.tracks.at(0)) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie ma żadnych piosenek w kolejce!**`).setColor("Red")]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});

    try {
        await queue.node.skip();
        return message.reply({embeds: [new EmbedBuilder().setTitle(`⏩ Pominąłeś aktualną piosenkę!`).setDescription(`**Pominąłeś:** \`\`${queue.currentTrack.title}\`\` `).setColor("6b3deb").setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})]});
    } catch {
        return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie powiodło się pominięcie utworu!**`).setColor("Red")]});
    };

};

exports.info = {
    name: "skip",
    aliases: ['sk']
};