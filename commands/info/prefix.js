'use strict';

const guildSettings = require('../../utils/guildSettings.js');
const { createEmbed } = require('../../utils/embedCreator.js');
const { embeds } = require('../../utils/embeds.js');

exports.run = async (_client, message, args) => {

    let prefix = args[0];

    if (prefix === 'clear') prefix = process.env.PREFIX;

    let guildData = await guildSettings.findOne({ guildId: message.guild.id });
    const oldPrefix = guildData ? guildData.prefix : process.env.PREFIX;

    if (!prefix) return message.channel.send({ embeds: [embeds.prefix_change_error] });

    if (oldPrefix === prefix) return message.channel.send({ embeds: [embeds.already_prefix_error] });

    const guildId = message.guild.id;

    try {
        await guildSettings.updateOne({ guildId }, { guildId, prefix }, { upsert: true });
        return message.channel.send({ embeds: [createEmbed({ description: `✅ **Ustawiono nowy prefix:** \`${prefix}\`` })] });
    } catch {
        return message.channel.send({ embeds: [embeds.catch_error] });
    };
};

exports.info = {
    name: "prefix",
    perm: "Administrator"
};