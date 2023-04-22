'use strict';

const { EmbedBuilder } = require('discord.js');
const GuildSettings = require('../../utils/guildSettings.js');
const embeds = require('../../utils/embeds.js');

exports.run = async (_client, message) => {
    const guildData = await GuildSettings.findOne({guildId: message.guild.id});

    if (!message.guild.roles.cache.has(guildData?.djRoleId)) return message.reply({embeds: [embeds.dj_set_error]});
    
    await GuildSettings.updateOne({guildId: message.guild.id}, {djRoleId: null}, {upsert: true, new: true});

    return message.reply({embeds: [new EmbedBuilder().setDescription(`✅ **Usunięto DJ rolę!**`).setColor('Red')]});
};

exports.info = {
    name: "djremove",
    perm: "Administrator"
};