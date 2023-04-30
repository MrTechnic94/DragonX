'use strict';

const { ActivityType } = require('discord.js');
const embeds = require('../../utils/embeds.js');
const { createEmbed } = require('../../utils/embedCreator.js');

exports.run = async (client, message, args) => {
    if (!args[0]) return message.reply({embeds: [embeds.args_status_error]});

    switch(args[0]) {
        default:
            client.user.setPresence({activities: [{name: args.join(' '), type: ActivityType.Listening}]});
            message.reply({embeds: [createEmbed({title: `✅ Pomyślnie ustawiono status`, description: `Status został zmieniony na \`\`${args.join(' ')}\`\``})]});
            break;
        
        case 'clear':
            client.user.setPresence({activities: [{name: process.env.STATUSTWO, type: ActivityType.Listening}], status: 'online'});
            message.reply({embeds: [createEmbed({title: `✅ Pomyślnie wyczyszczono status`, description: `Status został zmieniony na: \`\`${process.env.STATUSTWO}\`\``})]});
            break;
    };
};

exports.info = {
    name: "status",
    owner: true
};