'use strict';

const { EmbedBuilder } = require('discord.js');
const GuildSettings = require('../../utils/guildSettings.js');

exports.run = async (_client, message) => {
    const guildData = await GuildSettings.findOne({guildId: message.guild.id});
    const prefix = guildData ? guildData.prefix : process.env.PREFIX;
    const dj = guildData?.djRoleId ? `<@&${guildData.djRoleId}>` : '`nie ustawiono`';

    return message.reply({
        embeds: [
            new EmbedBuilder()
                .setTitle(`🔧 Ustawienia serwera`)
                .setDescription(`**Prefix:** \`\`${prefix}\`\`\n**DJ Rola:** ${dj}`)
                .setColor('Red')]
    });
};

exports.info = {
    name: "settings",
    perm: `Administrator`
};