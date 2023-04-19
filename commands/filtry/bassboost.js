'use strict';

const { EmbedBuilder } = require('discord.js');
const embeds = require('../../utils/embeds.js');

exports.run = async (client, message) => {
    const queue = client.player.nodes.get(message.guild.id);

    if (!queue?.isPlaying()) return message.reply({embeds: [embeds.queue_error]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [embeds.voice_error]});

    const mode = queue.filters.ffmpeg.isEnabled('bassboost') ? `wyłączony` : `włączony`;
    await queue.filters.ffmpeg.toggle(['bassboost', 'normalizer']);

    return message.reply({embeds: [new EmbedBuilder().setDescription(`🎵 **Bassboost został ${mode}!**`).setColor('Red')]});

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
    aliases: ["bs"],
    dj: true
};