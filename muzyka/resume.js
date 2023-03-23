'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message) => {

    const queue = client.player.nodes.get(message.guild.id);

    if (!queue || !queue.isPlaying()) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("Red")]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});
    
    if (!queue.node.isPaused()) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Piosenka nie jest zatrzymana!**`).setColor("Red")]});

    try {
        await queue.node.resume();
        return message.reply({embeds: [new EmbedBuilder().setTitle(`🔊 Wznowiłeś odtwarzanie piosenki`).setDescription(`**Wznowiłeś odtwarzanie piosenki** \`\`${queue.currentTrack.title}\`\` `).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("6b3deb")]});
    } catch {
        return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie mogę wznowić piosenki!**`).setColor("Red")]});
    };

};

exports.info = {
    name: "resume"
}