'use strict';

const embeds = require('../../utils/embeds.js');
const { createEmbed } = require('../../utils/embedCreator.js');

exports.run = async (client, message) => {
    if (!message.guild.members.me?.voice.channelId) return message.reply({embeds: [embeds.bot_voice_error]});

    if (!message.member?.voice.channelId) return message.reply({embeds: [embeds.member_voice_error]});

    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [embeds.voice_error]});

    const queue = client.player.nodes.get(message.guild.id);

    if (queue) {
        await queue.delete();
    };
    await message.guild.members.me?.voice.disconnect();
    return message.reply({embeds: [createEmbed({description: `🔮 **Wychodzę z kanału!**`})]});
};

exports.info = {
    name: "leave",
    aliases: ["l", "disconnect", "dc"],
    dj: true
};