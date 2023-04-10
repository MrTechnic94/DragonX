const { MessageEmbed } = require('discord.js');

exports.run = async (client, queue, track) => {

    function SendEmbed(desc, channel){

        const embed = new MessageEmbed()
        .setThumbnail(track.thumbnail)
        .setTitle("▶️ Aktualnie Odtwarzam")
        .setDescription(desc)
        .setColor("BLUE")
        .setFooter({text: `⚡ Powered by DragonX System`})
    
        return channel.send({embeds: [embed]})

    }

    if (queue.repeatMode == 2) return;
    SendEmbed(`**${track.title}**`, queue.metadata);

};