'use strict';

const messageEmbeds = require('../../utils/messageEmbeds.js');
const { exec } = require('child_process');
const { createEmbed } = require('../../utils/embedCreator.js');

module.exports = {
    name: 'cmd',
    owner: true,
    run: async (_client, message, args) => {
        if (!args.length) return message.channel.send({ embeds: [messageEmbeds.args_cmd_error] });

        exec(args.join(' '), (error, stdout) => {
            if (error) return message.channel.send({ embeds: [createEmbed({ description: `❌ **Wystąpił błąd podczas wykonywania komendy:**\n\`\`\`${error}\`\`\`` })] });

            return message.channel.send({ embeds: [createEmbed({ description: `✅ **Komenda została wykonana pomyślnie:**\n\`\`\`${stdout}\`\`\`` })] });
        });
    }
};