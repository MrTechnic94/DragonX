'use strict';

const messageEmbeds = require('../../utils/messageEmbeds');
const { useTimeline } = require('discord-player');

module.exports = {
    name: 'resume',
    dj: true,
    cooldown: 2,
    async run(_client, message) {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.voice_error] });

        const timeline = useTimeline(message.guild.id);

        if (!timeline?.track) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

        if (!timeline.paused) return message.channel.send({ embeds: [messageEmbeds.resumed_error] });

        if (timeline.volume === 0) return message.channel.send({ embeds: [messageEmbeds.muted_player_error] });

        timeline.resume();

        return message.channel.send({ embeds: [messageEmbeds.resume_success] });
    },
};