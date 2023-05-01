'use strict';

const embeds = require('../../utils/embeds.js');
const { createEmbed } = require('../../utils/embedCreator.js');

exports.run = async (client, message) => {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [embeds.voice_error]});

    const queue = client.player.nodes.get(message.guild.id);
    
    if (!queue) return message.reply({embeds: [embeds.queue_error]});

    if (queue.repeatMode === 0 && !queue.tracks.at(0)) return message.reply({embeds: [embeds.track_queue_error]});

    queue.votes = queue?.votes || [];

    if (queue.votes.includes(message.author.id)) return message.reply({embeds: [embeds.already_voted_error]});
    
    queue.votes.push(message.author.id);
    const required = Math.ceil((message.channel.members.size - 1) / 2);
    const currentVotes = queue.votes.length;
    
    if (currentVotes >= required) {
        await queue.node.skip();
        queue.votes = [];
        return message.channel.send({embeds: [createEmbed({description: `⏩ **Pominięto aktualną piosenkę!**`})]});
    };
    
    return message.reply({embeds: [createEmbed({description: `**Zagłosowałeś na pominięcie piosenki (${currentVotes} / ${required})**`})]});
};

exports.info = {
    name: "skip",
    aliases: ["s", "vote"]
};