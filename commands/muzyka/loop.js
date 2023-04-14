'use strict';

const { MessageEmbed } = require('discord.js');
const { QueueRepeatMode } = require('discord-player');

exports.run = async (client, message) => {

    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("RED")]});

    if (queue.repeatMode === 2) return message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Muzyka jest już zapętlona!**`).setColor("RED")]});

    try {
        queue.setRepeatMode(QueueRepeatMode.QUEUE);
        return message.reply({embeds: [new MessageEmbed().setTitle("🔄 Powtarzanie piosenek").setDescription(`**Powtarzasz piosenkę:** \`\`${queue.current.title}\`\``).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("6b3deb")]});
    } catch (error) {
        return message.reply({embeds: [new MessageEmbed().setTitle("❌ Nie mogę powtórzyć piosenki!").setColor("RED")]});
    }
};

exports.info = {
    name: "loop"
}