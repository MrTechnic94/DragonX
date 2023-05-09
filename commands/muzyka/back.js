'use strict';

const embeds = require('../../utils/embeds.js');
const { createEmbed } = require('../../utils/embedCreator.js');

exports.run = async (client, message) => {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({embeds: [embeds.voice_error]});

    const queue = client.player.nodes.get(message.guild.id);

    if (!queue || queue.history.previousTracks < 1) return message.channel.send({embeds: [embeds.queue_error]});

    await queue.history.back();
    return message.channel.send({embeds: [createEmbed({description: `◀️ **Odtwarzam poprzedni utwór!**`})]});
};

exports.info = {
    name: "back",
    aliases: ["b", "previous", "prev"],
    dj: true
};