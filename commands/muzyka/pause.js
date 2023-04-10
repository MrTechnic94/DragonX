'use strict';

const { MessageEmbed } = require('discord.js');
const { Player } = require('discord-player');

exports.run = async (client, message) => {

    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("RED")]});

    try {
        queue.setPaused(true);
        return message.reply({embeds: [new MessageEmbed().setTitle(`🔇 Zatrzymałeś odtwarzanie piosenki!`).setDescription(`**Zatrzymałeś odtwarzanie piosenki:** \`\`${queue.current.title}\`\` `).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("6b3deb")]});
    } catch (error) {
        return message.reply({embeds: [new MessageEmbed().setTitle(`❌ Nie mogę zatrzymać utworu!`).setColor("RED")]});
}

};

exports.info = {
    name: "pause"
}