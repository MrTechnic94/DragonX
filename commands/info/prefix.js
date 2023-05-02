'use strict';

const GuildSettings = require('../../utils/guildSettings.js');
const embeds = require('../../utils/embeds.js');
const { createEmbed } = require('../../utils/embedCreator.js');

exports.run = async (_client, message, args) => {
    const prefix = args[0];

    if (prefix === 'clear') {
        prefix = process.env.PREFIX;
    };

    let guildData = await GuildSettings.findOne({guildId: message.guild.id});
    const oldPrefix = guildData ? guildData.prefix : process.env.PREFIX;

    if (!prefix) return message.reply({embeds: [embeds.prefix_change_error]});
    
    if (oldPrefix === prefix) return message.reply({embeds: [embeds.already_prefix_error]});

    try {
        const guildId = message.guildId;

        await GuildSettings.updateOne({guildId}, {guildId, prefix}, {upsert: true});

        return message.reply({embeds: [createEmbed({description: `✅ **Ustawiono nowy prefix:** \`${prefix}\``})]});
    } catch {
        return message.reply({embeds: [embeds.prefix_change_error]});
    };
};

exports.info = {
    name: "prefix",
    perm: "Administrator"
};