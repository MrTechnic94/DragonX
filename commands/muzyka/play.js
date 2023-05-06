'use strict';

const embeds = require('../../utils/embeds.js');
const { createEmbed } = require('../../utils/embedCreator.js');

exports.run = async (client, message, args) => {
    if (!args[0]) return message.channel.send({embeds: [embeds.track_error]});

    if (!message.member?.voice.channelId) return message.channel.send({embeds: [embeds.member_voice_error]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({embeds: [embeds.voice_error]});

    const res = await client.player.search(args.join(' '), {
        requestedBy: message.member
    });

    if (!res.hasTracks()) return message.channel.send({embeds: [embeds.track_error]});

    const msg = await message.channel.send(`🔎 **Proszę czekać wyszukuję...**`);

    await client.player.play(message.member.voice.channel, res, {
        nodeOptions: {
            metadata: message.channel
        }
    });
    msg.delete();
    return message.channel.send({embeds: [createEmbed({description: res.playlist ? `✅ Dodano **${res.tracks.length}** utwory do playlisty!` : `✅ **${res.tracks[0].title}** dodano do playlisty!`})]});
};

exports.info = {
    name: "play",
    aliases: ["p", "songrequest", "sr"],
    dj: true
};
