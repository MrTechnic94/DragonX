'use strict';

const GuildSettings = require('../../utils/guildSettings.js');
const { QueueRepeatMode } = require('discord-player');
const { createEmbed } = require('../../utils/embedCreator.js');
const embeds = require('../../utils/embeds.js');

exports.run = async (client, message) => {
    try {
        const queue = client.player.nodes.get(message.guild.id);
        const guildData = await GuildSettings.findOne({ guildId: message.guild.id });
        const prefix = guildData ? guildData.prefix : process.env.PREFIX;
        const dj = guildData?.djRoleId ? `<@&${guildData.djRoleId}>` : '`nie ustawiono`';

        if (!queue?.isPlaying()) return message.channel.send({ embeds: [createEmbed({ title: `🔧 Ustawienia serwera`, description: `**Prefix:** \`\`${prefix}\`\`\n**DJ Rola:** ${dj}\n**Autoplay:** \`\`wyłączony\`\`\n**Loop:** \`\`wyłączony\`\`\n**Volume:** \`\`100%\`\`` })] });

        const autoplay = queue.repeatMode === QueueRepeatMode.AUTOPLAY ? '`włączony`' : '`wyłączony`';
        const loop = queue.repeatMode === QueueRepeatMode.OFF ? '`wyłączony`' : queue.repeatMode === QueueRepeatMode.TRACK ? '`track`' : '`playlist`';

        return message.channel.send({
            embeds:
                [createEmbed({
                    title: `🔧 Ustawienia serwera`,
                    description: `**Prefix:** \`\`${prefix}\`\`\n**DJ Rola:** ${dj}\n**Autoplay:** ${autoplay}\n**Loop:** ${loop}\n**Volume:** \`\`${queue.node.volume}%\`\``
                })]
        });
    } catch {
        return message.channel.send({ embeds: [embeds.catch_error] });
    };
};

exports.info = {
    name: "settings",
    aliases: ["config"],
    perm: "Administrator"
};