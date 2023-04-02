'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (_client, queue, track) => {

    if (queue.repeatMode == 1) return;

    const embed = new EmbedBuilder()
    .setTitle("▶️ Aktualnie Odtwarzam")
    .setDescription(`[${track.title}](${track.url})`)
    .addFields(
        {name: '**Na prośbę:**', value: `${track.requestedBy}`, inline: true},
        {name: '**Czas trwania:**', value: `\`\`${track.duration}\`\``, inline: true}
    )
    .setThumbnail(track.thumbnail)
    .setColor("Blue")
    
    return queue.metadata.channel.send({embeds: [embed]});

};