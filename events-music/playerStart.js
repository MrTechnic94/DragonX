'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (_client, queue, track) => {
    
    const request = track.requestedBy ?? `brak`;

    const embed = new EmbedBuilder()
    .setTitle("▶️ Aktualnie Odtwarzam")
    .setDescription(`[${track.title}](${track.url})`)
    .addFields(
        {name: '**Na prośbę:**', value: `${request}`, inline: true},
        {name: '**Czas trwania:**', value: `\`\`${track.duration}\`\``, inline: true}
    )
    .setThumbnail(track.thumbnail)
    .setColor("Blue")
    
    return queue.metadata.channel.send({embeds: [embed]}).then((msg) => {
        queue.npmessage = msg;
    });

};
