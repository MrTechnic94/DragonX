'use strict';

const { EmbedBuilder } = require('discord.js');
const embeds = require('../../utils/embeds.js');

exports.run = async (client, message) => {
    const queue = client.player.nodes.get(message.guild.id);

    if (!message.guild.members.me?.voice.channelId) return message.reply({embeds: [embeds.bot_voice_error]});

    if (!message.member?.voice.channelId) return message.reply({embeds: [embeds.member_voice_error]});

    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [embeds.voice_error]});

    if (queue) {
        await queue.delete();
    };
    await message.guild.members.me?.voice.disconnect();
    return message.reply({embeds: [new EmbedBuilder().setDescription(`🔮 **Wychodzę z kanału!**`).setColor('Red')]});
};

exports.info = {
    name: "leave",
    aliases: ['lv'],
    dj: true
};
