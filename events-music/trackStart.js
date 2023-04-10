'use strict';

const { MessageEmbed } = require('discord.js');

exports.run = async (_client, queue, track) => {

    function SendEmbed(desc, _channel) {

    const embed = new MessageEmbed()
    .setThumbnail(track.thumbnail)
    .setTitle("▶️ Aktualnie Odtwarzam")
    .setDescription(desc)
    .addFields(
        {name: '**Na prośbę:**', value: `${track.requestedBy}`, inline: true},
        {name: '**Czas trwania:**', value: `\`\`${track.duration}\`\``, inline: true}
    )
    .setColor("BLUE")
    
    return queue.metadata.channel.send({embeds: [embed]})

};

    if (queue.repeatMode == 2) return;

    SendEmbed(`[${track.title}](${track.url})`, queue.metadata);

};