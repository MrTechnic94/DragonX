'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (_client, queue, track) => {
    const requester = track.requestedBy ?? `brak`;

    const embed = new EmbedBuilder()
        .setTitle("▶️ Aktualnie Odtwarzam")
        .setDescription(`[${track.title}](${track.url})`)
        .addFields(
            { name: '**Na prośbę:**', value: `${requester}`, inline: true },
            { name: '**Czas trwania:**', value: `\`\`${track.duration}\`\``, inline: true }
        )
        .setThumbnail(track.thumbnail)
        .setColor("Blue");

    queue.npmessage = await queue.metadata.channel.send({embeds: [embed]});
};