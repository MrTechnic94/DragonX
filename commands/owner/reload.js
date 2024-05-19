'use strict';

const messageEmbeds = require('../../utils/messageEmbeds');
const { createEmbed } = require('../../utils/embedCreator');

module.exports = {
    name: 'reload',
    owner: true,
    cooldown: 2,
    async run(client, message, args) {
        if (!args[0]) return message.channel.send({ embeds: [messageEmbeds.args_category_error] });
        if (!args[1]) return message.channel.send({ embeds: [messageEmbeds.args_command_error] });

        const category = args[0].toLowerCase();
        const command = args[1].toLowerCase();

        try {
            delete require.cache[require.resolve(`../../commands/${category}/${command}.js`)];
            client.commands.delete(command);

            const newCommand = require(`../../commands/${category}/${command}.js`);
            client.commands.set(command, newCommand);

            return message.channel.send({ embeds: [createEmbed({ description: `✅ **Przeładowano komendę \`${command}\`**` })] });
        } catch {
            return message.channel.send({ embeds: [messageEmbeds.catch_error] });
        }
    },
};