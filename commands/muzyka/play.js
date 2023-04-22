'use strict';

const embeds = require('../../utils/embeds.js');

exports.run = async (client, message, args) => {
    if (!args[0]) return message.reply({embeds: [embeds.track_args_error]});

    if (!message.member?.voice.channelId) return message.reply({embeds: [embeds.voice_error]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [embeds.voice_error]});

    const res = await client.player.search(args.join(' '), {
        requestedBy: message.member
    });

    if (!res.hasTracks()) return message.reply({embeds: [embeds.track_error]});

    const m = await message.channel.send(`🔎 **Proszę czekać wyszukuję...**`);

    await client.player.play(message.member.voice.channel?.id, res, {
        nodeOptions: {
            metadata: {
                channel: message.channel
            },
            leaveOnEnd: true,
            // leaveOnEndCooldown: 120000,
            leaveOnStop: true,
            leaveOnEmpty: true,
            skipOnNoStream: true,
            ytdlOptions: {
                filters: 'audioonly',
                quality: 'highestaudio'
            }
        }
    });
    m.delete();
};

exports.info = {
    name: "play",
    aliases: ['p', 'songrequest', 'sr'],
    dj: true
};
