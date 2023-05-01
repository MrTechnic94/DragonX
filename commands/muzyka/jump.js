'use strict';

const embeds = require('../../utils/embeds.js');
const { createEmbed } = require('../../utils/embedCreator.js');

exports.run = async (client, message, args) => {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [embeds.voice_error]});

    const queue = client.player.nodes.get(message.guild.id);
    const index = parseInt(args[0]) - 1;
    
    if (!queue) return message.reply({embeds: [embeds.queue_error]});

    const track = queue.tracks.at(index);

    if (!index || !track || index < 0) return message.reply({embeds: [embeds.number_error]});

    await queue.node.skipTo(index);
    return message.reply({embeds: [createEmbed({description: `⏩ **Przeskoczono: ${track.title}!**`})]});
};

exports.info = {
    name: "jump",
    aliases: ["j"],
    dj: true
};