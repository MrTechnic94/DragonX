'use strict';

const embeds = require('../../utils/embeds.js');
const { createEmbed } = require('../../utils/embedCreator.js');

exports.run = async (client, message) => {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({embeds: [embeds.voice_error]});
    
    const queue = client.player.nodes.get(message.guild.id);

    if (!queue) return message.channel.send({embeds: [embeds.queue_error]});

    if (!queue.node.isPaused()) return message.channel.send({embeds: [embeds.resumed_error]});

    await queue.node.resume();
    return message.channel.send({embeds: [createEmbed({description: `🔊 **Wznowiono odtwarzanie piosenki!**`})]});
};

exports.info = {
    name: "resume",
    aliases: ["r"],
    dj: true
};