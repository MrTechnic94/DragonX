'use strict';

const embeds = require('../../utils/embeds.js');
const { createEmbed } = require('../../utils/embedCreator.js');

exports.run = async (client, message) => {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [embeds.voice_error]});
    
    const queue = client.player.nodes.get(message.guild.id);

    if (!queue?.isPlaying()) return message.reply({embeds: [embeds.queue_error]});

    if (!queue.node.isPaused()) return message.reply({embeds: [embeds.resumed_error]});

    await queue.node.resume();
    return message.reply({embeds: [createEmbed({description: `🔊 **Wznowiono odtwarzanie piosenki!**`})]});
};

exports.info = {
    name: "resume",
    aliases: ["r"],
    dj: true
};