'use strict';

const messageEmbeds = require('../../utils/messageEmbeds');
const { createEmbed } = require('../../utils/embedCreator');
const { exec } = require('child_process');

module.exports = {
    name: 'cmd',
    owner: true,
    cooldown: 2,
    async run(_client, message, args) {
        if (!args.length) return message.channel.send({ embeds: [messageEmbeds.args_cmd_error] });

        exec(args.join(' '), (error, stdout) => {
            if (error) return message.channel.send({ embeds: [createEmbed({ description: `❌ **Wystąpił błąd podczas wykonywania komendy:**\n\`\`\`${error}\`\`\`` })] });

            return message.channel.send({ embeds: [createEmbed({ description: `✅ **Komenda została pomyślnie wykonana:**\n\`\`\`${stdout}\`\`\`` })] });
        });
    }
};