'use strict';

const messageEmbeds = require('../../utils/messageEmbeds');
const { createEmbed } = require('../../utils/embedCreator');
const { exec } = require('node:child_process');

module.exports = {
    name: 'cmd',
    owner: true,
    cooldown: 2,
    async run(_client, message, args) {
        if (!args.length) return message.channel.send({ embeds: [messageEmbeds.args_cmd_error] });

        const msg = await message.channel.send('🔎 **Wykonuje polecenie...**');

        exec(args.join(' '), (error, stdout) => {
            msg.delete();

            if (error) return message.channel.send({ embeds: [createEmbed({ description: `❌ **Wystąpił błąd podczas wykonywania komendy**\n\`\`\`${error}\`\`\`` })] });

            return message.channel.send({ embeds: [createEmbed({ description: `✅ **Komenda została pomyślnie wykonana**\n\`\`\`${stdout}\`\`\`` })] });
        });
    },
};