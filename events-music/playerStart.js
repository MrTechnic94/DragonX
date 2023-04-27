'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (_client, queue, track) => {
    const requester = track.requestedBy ?? `brak`;
    
    queue.npmessage = await queue.metadata.channel.send({
        embeds: [new EmbedBuilder()
            .setTitle('▶️ Aktualnie odtwarzam')
            .setDescription(`[${track.title}](${track.url})`)
            .addFields(
                { name: '**Na prośbę:**', value: `${requester}`, inline: true },
                { name: '**Czas trwania:**', value: `\`\`${track.duration}\`\``, inline: true }
            )
            .setThumbnail(track.thumbnail)
            .setColor('Red')]
    });
};
