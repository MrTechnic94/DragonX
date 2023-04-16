'use strict';

const { EmbedBuilder } = require('discord.js');
const GuildSettings = require('../../models/GuildSettings.js');

exports.run = async (_client, message, args) => {

    const prefix = args[0];
    let guildData = await GuildSettings.findOne({guildId: message.guild.id});
    const oldPrefix = guildData ? guildData.prefix : process.env.PREFIX;

    if (!prefix) return message.reply({embeds: [new EmbedBuilder().setDescription('❌ **Musisz podać nowy prefix!**').setColor('Red')]});
    
    if (oldPrefix === prefix) return message.reply({embeds: [new EmbedBuilder().setDescription('❌ **Ten prefix jest już używany!**').setColor('Red')]});

    try {
        const guildId = message.guildId;
        await GuildSettings.updateOne({ guildId }, { guildId, prefix }, { upsert: true });
      
        return message.reply({embeds: [new EmbedBuilder().setDescription(`✅ **Ustawiono nowy prefix:** \`${prefix}\``).setColor('Green')]});
    } catch {
        return message.reply({embeds: [new EmbedBuilder().setDescription('❌ **Wystąpił błąd poczas zmiany prefixu!**').setColor('Red')]});
    };

};

exports.info = {
    name: "prefix",
    perm: "Administrator"
};