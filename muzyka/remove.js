'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message, args) => {

    const queue = client.player.nodes.get(message.guild.id);
    const index = args[0] - 1;
    
    if (!queue || !queue.isPlaying()) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("Red")]});

    const trackname = queue.tracks[index].title;

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});

    if (index === undefined) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nieprawidłowa liczba!**`).setColor("Red")]});

    if (args[0] <= 0 || args[0] >= queue.tracks.length) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Test!**`).setColor("Red")]});

    if (!trackname) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Ten utwór nie istneje!**`).setColor("Red")]});

    if (isNaN(index)) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ \`\`${args[0]}\`\` **nie jest liczbą!**`).setColor("Red")]});

    try {
        queue.remove(index);
        return message.reply({embeds: [new EmbedBuilder().setTitle(`🎯 Usunąłeś piosenkę z kolejki!`).setDescription(`**Usunąłeś:** \`\`${trackname}\`\` `).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("6b3deb")]});
    } catch (error) {
        return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie mogę usunąć tego utworu!**`).setColor("Red")]});
    };

};

exports.info = {
    name: "remove"
}