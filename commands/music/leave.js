'use strict';

const { createEmbed } = require('../../utils/embedCreator.js');
const messageEmbeds = require('../../utils/messageEmbeds.js');
const { useQueue } = require('discord-player');

module.exports = {
    name: 'leave',
    aliases: ['l', 'disconnect', 'dc', 'stop'],
    dj: true,
    cooldown: 2,
    run: async (_client, message) => {
        if (!message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.bot_voice_error] });

        if (!message.member?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.member_voice_error] });

        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.voice_error] });

        const queue = useQueue(message.guild.id);

        if (queue) {
            queue.delete();
        } else {
            message.guild.members.me?.voice.disconnect();
        };

        return message.channel.send({ embeds: [createEmbed({ description: `🔮 **Wychodzę z kanału** <#${message.member?.voice.channelId}>` })] });
    }
};