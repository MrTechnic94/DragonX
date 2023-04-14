'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message) => {

    const queue = client.player.getQueue(message.guild.id);
    
    if (!queue || !queue.playing) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("Red")]});

    if (!queue.tracks[0]) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie ma żadnych piosenek w kolejce!**`).setColor("Red")]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return await message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});

    try {
        queue.skip();
        return message.reply({embeds: [new EmbedBuilder().setTitle(`⏩ Pominąłeś aktualną piosenkę!`).setDescription(`**Pominąłeś:** \`\`${queue.current.title}\`\` `).setColor("6b3deb").setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})]});
    } catch (error) {
        return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie powiodło się pominięcie utworu!**`).setColor("Red")]});
    };

};

exports.info = {
    name: "skip"
}