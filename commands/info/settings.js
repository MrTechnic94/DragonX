'use strict';

const GuildSettings = require('../../utils/guildSettings.js');
const { createEmbed } = require('../../utils/embedCreator.js');

exports.run = async (_client, message) => {
    const guildData = await GuildSettings.findOne({guildId: message.guild.id});
    const prefix = guildData ? guildData.prefix : process.env.PREFIX;
    const dj = guildData?.djRoleId ? `<@&${guildData.djRoleId}>` : '`nie ustawiono`';

    return message.reply({
        embeds:
            [createEmbed({
                title: `🔧 Ustawienia serwera`,
                description: `**Prefix:** \`\`${prefix}\`\`\n**DJ Rola:** ${dj}`
            })]
    });
};

exports.info = {
    name: "settings",
    perm: "Administrator"
};