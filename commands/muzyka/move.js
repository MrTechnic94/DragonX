'use strict';

const embeds = require('../../utils/embeds.js');
const { createEmbed } = require('../../utils/embedCreator.js');

exports.run = async (client, message, args) => {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [embeds.voice_error]});

    const queue = client.player.nodes.get(message.guild.id);

    if (!queue) return message.reply({embeds: [embeds.queue_error]});

    const index = parseInt(args[0]);
    const indexTrack = parseInt(args[1]);
    const track = queue.tracks.at(index - 1);

    if (!index || !indexTrack || !track || index < 0 || indexTrack < 0 || index > queue.getSize() || indexTrack > queue.getSize()) return message.reply({embeds: [embeds.number_error]});
 
    const remove = queue.node.remove(index - 1);

    await queue.insertTrack(remove, indexTrack - 1);
    return message.reply({embeds: [createEmbed({description: `▶️ **Przeniesiono utwór na pozycję ${args[1]}!**`})]});
};

exports.info = {
    name: "move",
    aliases: ["mv"],
    dj: true
};