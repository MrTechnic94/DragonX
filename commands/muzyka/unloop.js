'use strict';

const { MessageEmbed } = require('discord.js');
const { QueueRepeatMode } = require('discord-player');

exports.run = async (client, message) => {

    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("RED")]});

    if (queue.repeatMode === 0) return message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Muzyka nie jest zapętlona!**`).setColor("RED")]});

    try {
        queue.setRepeatMode(QueueRepeatMode.OFF);
        return message.reply({embeds: [new MessageEmbed().setTitle("🔒 Pętla zakończona!").setDescription(`**Usunąłeś powtarzanie piosenki:** \`\`${queue.current.title}\`\` `).setColor("6b3deb").setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})]});
    } catch (error) {
        return message.reply({embeds: [new MessageEmbed().setTitle("❌ Nie udało się zakończyć pętli!").setColor("RED")]});
}

};

exports.info = {
    name: "unloop"
}