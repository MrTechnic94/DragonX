'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message, args) => {

    const queue = client.player.nodes.get(message.guild.id);
    
    if (!queue?.isPlaying()) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("Red")]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});

    switch(args[0]) {
        case 'on':
            if (queue.filters.ffmpeg.isEnabled('nightcore')) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Ten filtr jest już aktywowany!**`).setColor("Red")]});
            await queue.filters.ffmpeg.toggle(['nightcore']);
            return message.reply({embeds: [new EmbedBuilder().setDescription(`🎵 **Nightcore został włączony!**`).setFooter({text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("Green")]});

        case 'off':
            if (!queue.filters.ffmpeg.isEnabled('nightcore')) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Ten filtr nie jest aktywowany!**`).setColor("Red")]});
            await queue.filters.ffmpeg.toggle(['nightcore']);
            return message.reply({embeds: [new EmbedBuilder().setDescription(`🎵 **Nightcore został wyłączony!**`).setFooter({text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("Red")]});
    };

};

exports.info = {
    name: "nightcore",
    aliases: ["nc"]
};