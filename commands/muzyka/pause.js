'use strict';

const { MessageEmbed } = require('discord.js');

exports.run = async (client, message) => {

    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("RED")]});

    if (message.guild.me.voice.channelId && message.member.voice.channelId !== message.guild.me.voice.channelId) return await message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("RED")]});

    try {
        queue.setPaused(true);
        return message.reply({embeds: [new MessageEmbed().setTitle(`🔇 Zatrzymałeś odtwarzanie piosenki!`).setDescription(`**Zatrzymałeś odtwarzanie piosenki:** \`\`${queue.current.title}\`\` `).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("6b3deb")]});
    } catch (error) {
        return message.reply({embeds: [new MessageEmbed().setDescription(`❌ Nie mogę zatrzymać utworu!`).setColor("RED")]});
}

};

exports.info = {
    name: "pause"
}