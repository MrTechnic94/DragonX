'use strict';

const messageEmbeds = require('../../utils/messageEmbeds');
const { useHistory } = require('discord-player');

module.exports = {
    name: 'back',
    aliases: ['b', 'previous', 'prev'],
    dj: true,
    cooldown: 2,
    async run(_client, message) {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.voice_error] });

        const history = useHistory(message.guild.id);

        if (!history) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

        if (history.isEmpty()) return message.channel.send({ embeds: [messageEmbeds.track_back_error] });

        await history.previous();
        return message.channel.send({ embeds: [messageEmbeds.track_back_success] });
    },
};