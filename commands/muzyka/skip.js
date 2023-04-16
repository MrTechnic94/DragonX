'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message) => {

    const queue = client.player.nodes.get(message.guild.id);
    
    if (!queue?.isPlaying()) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("Red")]});

    if (queue.repeatMode === 0 && !queue.tracks.at(0)) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie ma żadnych piosenek w kolejce!**`).setColor("Red")]});

    queue.votes = queue.votes || [];
    
    const alreadyVoted = queue.votes.includes(message.author.id);
    if (alreadyVoted) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Już zagłosowałeś!**`).setColor("Red")]});
    
    queue.votes.push(message.author.id);
    const required = Math.ceil((message.channel.members.size - 1) / 2);
    const currentVotes = queue.votes.length;
    
    if (currentVotes >= required) {
        await queue.node.stop();
        queue.votes = [];
        return message.channel.send({embeds: [new EmbedBuilder().setDescription(`⏩ **Pominięto aktualną piosenkę!**`).setColor("6b3deb")]});
    };
    
    return message.reply({embeds: [new EmbedBuilder().setDescription(`**Zagłosowałeś na pominięcie piosenki (${currentVotes} / ${required})**`).setColor("Blue")]});

};

exports.info = {
    name: "skip",
    aliases: ['s']
};