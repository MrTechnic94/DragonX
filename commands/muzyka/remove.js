'use strict';

const embeds = require('../../utils/embeds.js');
const { createEmbed } = require('../../utils/embedCreator.js');

exports.run = async (client, message, args) => {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({embeds: [embeds.voice_error]});

    const queue = client.player.nodes.get(message.guild.id);
    
    if (!queue) return message.channel.send({embeds: [embeds.queue_error]});
    
    const index = parseInt(args[0]) - 1;
    const track = queue.tracks.at(index);

    if (!index || !track || index < 0) return message.channel.send({embeds: [embeds.number_error]});

    queue.node.remove(index);
    return message.channel.send({embeds: [createEmbed({description: `🎯 **Usunięto: ${track.title}!**`})]});
};

exports.info = {
    name: "remove",
    aliases: ["rm", "delete", "del"],
    dj: true
};