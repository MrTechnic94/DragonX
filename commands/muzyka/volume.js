'use strict';

const embeds = require('../../utils/embeds.js');
const { createEmbed } = require('../../utils/embedCreator.js');

exports.run = async (client, message, args) => {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [embeds.voice_error]});

    const queue = client.player.nodes.get(message.guild.id);
    const vol = parseInt(args[0]);

    if (!queue) return message.reply({embeds: [embeds.queue_error]});

    if (vol < 0 || vol > 200) return message.reply({embeds: [embeds.max_volume_error]});

    if (!vol) return message.reply({embeds: [createEmbed({description: `🔊 **Aktualna głośność: ${queue.node.volume}%**`})]});
  
    if (queue.node.volume === vol) return message.reply({embeds: [embeds.already_volume_error]});

    await queue.node.setVolume(vol);
    return message.reply({embeds: [createEmbed({description: `🔊 **Ustawiono głośność na: ${vol}%**`})]});
};

exports.info = {
    name: "volume",
    aliases: ["v", "vol"],
    dj: true
};
