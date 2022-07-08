'use strict';

const { MessageEmbed } = require('discord.js');
const playdl = require('play-dl');
playdl.getFreeClientID().then((clientID) => {
    playdl.setToken({
        soundcloud : { client_id : clientID }
    });
});

exports.run = async (client, message, args) => {

    const res = await client.player.search(args.join(' '), {
        requestedBy: message.member
    });

    if (!res || !res.tracks.length) return message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Nie znaleziono takiej piosenki!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("RED")]});

    const queue = await client.player.createQueue(message.guild, {
        spotifyBridge: false,
        disableVolume: false,
        leaveOnStop: true,
	    leaveOnEnd: true,
	    leaveOnEmpty: true,
        volumeSmoothness: 0.08,
        ytdlOptions: {
            quality: 'highestaudio',
            dlChunkSize: 0
        },
    metadata: {
        channel: message.channel
    },
    async onBeforeCreateStream(track, source, _queue) {
        if (source === 'youtube' || source === 'youtu.be') {    
            return (await playdl.stream(track.url, { discordPlayerCompatibility : true })).stream;
        } else if (source === 'soundcloud') {
            return (await playdl.stream(track.url, { discordPlayerCompatibility : true })).stream;
        }
    }
});

    try {
        if (!queue.connection) await queue.connect(message.member.voice.channel);
    } catch {
        await client.player.deleteQueue(message.guild.id);
        return message.reply({embeds:[new MessageEmbed().setDescription(`❌ **Musisz być na tym samym kanale co bot!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("RED")]});
    }
    
    await message.channel.send(`🔎 **Proszę czekać wyszukuję...**`).then(async m => {

    await res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

    if (!queue.playing) await queue.play();
    m.delete()

    })
};

exports.info = {
    name: "play"
}