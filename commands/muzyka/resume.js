'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message) => {

    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("Red")]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return await message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});
    
    if (!queue.connection.paused) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Piosenka nie jest zatrzymana!**`).setColor("Red")]});

    try {
        queue.setPaused(false);
        return message.reply({embeds: [new EmbedBuilder().setTitle(`🔊 Wznowiłeś odtwarzanie piosenki`).setDescription(`**Wznowiłeś odtwarzanie piosenki** \`\`${queue.current.title}\`\` `).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("6b3deb")]});
    } catch (error) {
        return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie mogę wznowić piosenki!**`).setColor("Red")]});
    };

};

exports.info = {
    name: "resume"
}