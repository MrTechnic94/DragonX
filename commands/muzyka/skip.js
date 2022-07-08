'use strict';

const { MessageEmbed } = require('discord.js');

exports.run = async (client, message) => {

    const queue = client.player.getQueue(message.guild.id);
    
    if (!queue || !queue.playing) return message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("RED")]});

    if (!queue.tracks[0]) return message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Nie ma żadnych piosenek w kolejce!**`).setColor("RED")]});

    try {
        queue.skip();
        return message.reply({embeds: [new MessageEmbed().setTitle(`⏩ Pominąłeś Aktualną Piosenkę!`).setDescription(`**Pominąłeś:** \`\`${queue.current.title}\`\` `).setColor("6b3deb").setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})]});
    } catch (error) {
        return message.reply({embeds: [new MessageEmbed().setTitle(`❌ Nie powiodło się pominięcie utworu!`).setColor("RED")]});
}

};

exports.info = {
    name: "skip"
}