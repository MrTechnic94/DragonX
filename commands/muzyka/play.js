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

    message.channel.send({embeds: [createEmbed({description: res.hasPlaylist() ? `✅ Dodano **${res.tracks.length}** utwory do playlisty!` : `✅ **${res.tracks[0].title}** dodano do playlisty!`})]});

    await client.player.play(message.member.voice.channel, res, {
        nodeOptions: {
            metadata: message.channel
        },
        leaveOnEndCooldown: 240000,
        leaveOnStop: true,
        leaveOnEmpty: true,
        skipOnNoStream: true,
        ytdlOptions: {
            filters: 'audioonly',
            quality: 'highestaudio'
        }
    });
};

exports.info = {
    name: "play",
    aliases: ["p", "songrequest", "sr"],
    dj: true
};
