'use strict';

const { MessageEmbed } = require('discord.js');

exports.run = async (client, message) => {

    const queue = client.player.getQueue(message.guild.id);

    if (!message.guild.me.voice.channel) return message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Nie ma mnie na żadnym kanale!**`).setColor("RED")]});

    try {
        if (queue) await queue.destroy();
        await message.guild.me.voice.disconnect();
        return message.reply({embeds: [new MessageEmbed().setDescription("🔮 **Wychodzę z kanału!**").setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("GOLD")]});
    } catch (error) {
        return message.reply({embeds: [new MessageEmbed().setTitle("❌ Nie mogę wyjść z kanału!").setColor("RED")]});
    }

};

exports.info = {
    name: "leave"
}