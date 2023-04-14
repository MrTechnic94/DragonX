'use strict'

const { MessageEmbed } = require('discord.js');

exports.run = async (client, queue, track) => {

    const player = client.player

    function SendEmbed(desc, channel){

        const embed = new MessageEmbed()
        .setThumbnail(track.thumbnail)
        .setTitle("▶️ Aktualnie Odtwarzam")
        .setDescription(desc)
        .setColor("BLUE")
    
        return channel.send({embeds: [embed]})

    }

    if (player.client.hasWebplayer)
    player.client.io.to(queue.guild.id).emit("forceUpdate", {from: "music-trackStart"});
    
    if (queue.repeatMode == 2) return;

    SendEmbed(`[${track.title}](${track.url}) [${track.requestedBy}]`, queue.metadata);

};