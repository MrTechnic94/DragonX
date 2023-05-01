'use strict';

const embeds = require('../../utils/embeds.js');
const { createEmbed } = require('../../utils/embedCreator.js');

exports.run = async (client, message) => {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [embeds.voice_error]});

    const queue = client.player.nodes.get(message.guild.id);

    if (!queue) return message.reply({embeds: [embeds.queue_error]});

    if (queue.history.previousTracks < 1) return message.reply({embeds: [embeds.track_back_error]});

    await queue.history.back();
    return message.reply({embeds: [createEmbed({description: `◀️ **Odtwarzam poprzedni utwór!**`})]});
};

exports.info = {
    name: "back",
    aliases: ["b"],
    dj: true
};