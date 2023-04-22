'use strict';

const { EmbedBuilder } = require('discord.js');
const GuildSettings = require('../../utils/guildSettings.js');
const embeds = require('../../utils/embeds.js');

exports.run = async (_client, message, args) => {
    const prefix = args[0];
    let guildData = await GuildSettings.findOne({guildId: message.guild.id});
    const oldPrefix = guildData ? guildData.prefix : process.env.PREFIX;

    if (!prefix) return message.reply({embeds: [embeds.prefix_change_error]});
    
    if (oldPrefix === prefix) return message.reply({embeds: [embeds.already_prefix_error]});

    try {
        const guildId = message.guildId;
        await GuildSettings.updateOne({ guildId }, { guildId, prefix }, { upsert: true });
      
        return message.reply({embeds: [new EmbedBuilder().setDescription(`✅ **Ustawiono nowy prefix:** \`${prefix}\``).setColor('Red')]});
    } catch {
        return message.reply({embeds: [embeds.prefix_change_error]});
    };
};

exports.info = {
    name: "prefix",
    perm: "Administrator"
};