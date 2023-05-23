'use strict';

const { createEmbed } = require('../../utils/embedCreator.js');
const embeds = require('../../utils/embeds.js');
const GuildSettings = require('../../utils/guildSettings.js');

exports.run = async (_client, message, args) => {
    let prefix = args[0];

    if (prefix === 'clear') prefix = process.env.PREFIX;

    let guildData = await GuildSettings.findOne({guildId: message.guild.id});
    const oldPrefix = guildData ? guildData.prefix : process.env.PREFIX;

    if (!prefix) return message.channel.send({embeds: [embeds.prefix_change_error]});
    
    if (oldPrefix === prefix) return message.channel.send({embeds: [embeds.already_prefix_error]});

    try {
        const guildId = message.guildId;

        await GuildSettings.updateOne({guildId}, {guildId, prefix}, {upsert: true});

        return message.channel.send({embeds: [createEmbed({description: `✅ **Ustawiono nowy prefix:** \`${prefix}\``})]});
    } catch {
        return message.channel.send({embeds: [embeds.prefix_change_error]});
    };
};

exports.info = {
    name: "prefix",
    perm: "Administrator"
};