'use strict';

const { createEmbed } = require('../../utils/embedCreator.js');

module.exports = {
    name: 'playerStart',
    run: async (_client, queue, track) => {
        const requester = track.requestedBy ?? `**\`brak\`**`;

        queue.npmessage = await queue.metadata.send({
            embeds: [
                createEmbed({
                    title: `▶️ Aktualnie odtwarzam`,
                    description: `[${track.title}](${track.url})`,
                    fields: [
                        { name: '**Na prośbę:**', value: `${requester}`, inline: true },
                        { name: '**Czas trwania:**', value: `**\`${track.duration}\`**`, inline: true }
                    ],
                    thumbnail: track.thumbnail
                })
            ]
        });
    }
};