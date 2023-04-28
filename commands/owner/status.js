'use strict';

const { EmbedBuilder, ActivityType } = require('discord.js');
const embeds = require('../../utils/embeds.js');

exports.run = async (client, message, args) => {
    if (!args[0]) return message.reply({embeds: [embeds.args_status_error]});

    switch(args[0]) {
        default:
            client.user.setPresence({activities: [{name: args.join(' '), type: ActivityType.Listening}]});

            message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`✅ Pomyślnie ustawiono status`)
                        .setDescription(`Status został zmieniony na \`\`${args.join(' ')}\`\``)
                        .setColor('Red')]
            });
            break;
        
        case 'clear':
            client.user.setPresence({activities: [{name: process.env.STATUSTWO, type: ActivityType.Listening}], status: 'online'});

            message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`✅ Pomyślnie wyczyszczono status`)
                        .setDescription(`Status został zmieniony na: \`\`${process.env.STATUSTWO}\`\``)
                        .setColor('Red')]

            });
            break;
    };
};

exports.info = {
    name: "status",
    owner: true
};