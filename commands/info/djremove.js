'use strict';

const { EmbedBuilder } = require('discord.js');
const GuildSettings = require('../../models/GuildSettings.js');

exports.run = async (_client, message) => {

    const guildData = await GuildSettings.findOne({guildId: message.guild.id});

    if (!message.guild.roles.cache.has(guildData?.djRoleId)) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie ustawiono DJ roli!**`).setColor("Red")]});
    
    await GuildSettings.updateOne({guildId: message.guild.id}, {djRoleId: null}, {upsert: true, new: true});

    return message.reply({embeds: [new EmbedBuilder().setDescription(`✅ **Usunięto DJ rolę!**`).setColor("Green")]});

};

exports.info = {
    name: "djremove",
    perm: "Administrator"
};