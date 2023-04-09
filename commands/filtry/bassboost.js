'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message, args) => {

    const queue = client.player.nodes.get(message.guild.id);

    if (!queue?.isPlaying()) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("Red")]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});

    const mode = queue.filters.ffmpeg.isEnabled('bassboost') ? `wyłączony` : `włączony`
    await queue.filters.ffmpeg.toggle(['bassboost', 'normalizer']);

    return message.reply({embeds: [new EmbedBuilder().setDescription(`🎵 **Bassboost został ${mode}!**`).setFooter({text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor(queue.filters.ffmpeg.isEnabled('bassboost') ? `Green` : `Red`)]});

    // switch(args[0]) {
    //     case 'on':
    //         if (queue.filters.ffmpeg.isEnabled('bassboost')) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Ten filtr jest już aktywowany!**`).setColor("Red")]});
    //         await queue.filters.ffmpeg.toggle(['bassboost', 'normalizer']);
    //         message.reply({embeds: [new EmbedBuilder().setDescription(`🎵 **Bassboost został włączony!**`).setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }).setColor("Green")]});
    //         break;

    //     case 'off':
    //         if (!queue.filters.ffmpeg.isEnabled('bassboost')) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Ten filtr nie jest aktywowany!**`).setColor("Red")]});
    //         await queue.filters.ffmpeg.toggle(['bassboost']);
    //         message.reply({embeds: [new EmbedBuilder().setDescription(`🎵 **Bassboost został wyłączony!**`).setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }).setColor("Red")]});
    //         break;
    // };
    
};

exports.info = {
    name: "bassboost",
    aliases: ["bs"]
};
