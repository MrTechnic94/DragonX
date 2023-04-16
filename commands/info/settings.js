'use strict';

const { EmbedBuilder } = require('discord.js');
const GuildSettings = require('../../models/GuildSettings.js');

exports.run = async (_client, message) => {

    const guildData = await GuildSettings.findOne({guildId: message.guild.id});
    const prefix = guildData ? guildData.prefix : process.env.PREFIX;
    const dj = guildData?.djRoleId ? `<@&${guildData.djRoleId}>` : '`nie ustawiono`';

    const embed = new EmbedBuilder()
    .setTitle(`🔧 Ustawienia serwera`)
    .setDescription(`**Prefix:** \`\`${prefix}\`\`\n**DJ Rola:** ${dj}`)
    .setFooter({text: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})
    .setColor('Red');

    return message.reply({embeds: [embed]});

};

exports.info = {
    name: "settings"
};