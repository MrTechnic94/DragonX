'use strict';

const GuildSettings = require('../../utils/guildSettings.js');
const { createEmbed } = require('../../utils/embedCreator.js');
const { QueueRepeatMode } = require('discord-player');

exports.run = async (client, message) => {
    const queue = client.player.nodes.get(message.guild.id);
    const guildData = await GuildSettings.findOne({guildId: message.guild.id});
    const prefix = guildData ? guildData.prefix : process.env.PREFIX;
    const dj = guildData?.djRoleId ? `<@&${guildData.djRoleId}>` : '`nie ustawiono`';

    if (!queue) return message.reply({embeds: [createEmbed({title: `🔧 Ustawienia serwera`, description: `**Prefix:** \`\`${prefix}\`\`\n**DJ Rola:** ${dj}\n**Autoplay:** \`\`wyłączony\`\`\n**Powtarzanie:** \`\`wyłączone\`\`\n**Głośność:** \`\`100%\`\``})]});

    const autoplay = queue.repeatMode === QueueRepeatMode.AUTOPLAY ? '`włączony`' : '`wyłączony`';
    const loop = queue.repeatMode === QueueRepeatMode.OFF ? '`wyłączone`' : queue.repeatMode === QueueRepeatMode.TRACK ? '`piosenki`' : '`playlisty`';

    return message.reply({
        embeds:
            [createEmbed({
                title: `🔧 Ustawienia serwera`,
                description: `**Prefix:** \`\`${prefix}\`\`\n**DJ Rola:** ${dj}\n**Autoplay:** ${autoplay}\n**Powtarzanie:** ${loop}\n**Głośność:** \`\`${queue.node.volume}%\`\``
            })]
    });
};

exports.info = {
    name: "settings",
    aliases: ["config"],
    perm: "Administrator"
};
