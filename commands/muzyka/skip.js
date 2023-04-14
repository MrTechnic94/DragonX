const { MessageEmbed } = require('discord.js');
const { Player } = require('discord-player');

exports.run = async (client, message) => {

    const queue = client.player.getQueue(message.guild.id);
    
    if (!queue || !queue.playing) return message.reply({embeds:[new MessageEmbed().setDescription(`❌ **Nie gra żadna piosenka!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("RED")]});

    await queue.skip();

    return message.reply({embeds:[new MessageEmbed().setTitle(`⏩ **Pominąłeś Aktualną Piosenkę!**`).setDescription(`**Pominąłeś:** \`\`${queue.current.title}\`\` `).setColor("6b3deb").setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})]});

};

exports.info = {
    name: "skip"
}