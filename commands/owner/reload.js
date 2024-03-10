'use strict';

const { createEmbed } = require('../../utils/embedCreator.js');
const { messageEmbeds } = require('../../utils/messageEmbeds.js');

exports.run = async (client, message, args) => {
    if (!args[0]) return message.channel.send({ embeds: [messageEmbeds.args_category_error] });
    if (!args[1]) return message.channel.send({ embeds: [messageEmbeds.args_command_error] });

    const category = args[0].toLowerCase();
    const command = args[1].toLowerCase();

    try {
        delete require.cache[require.resolve(`../../commands/${category}/${command}`)];
        client.commands.delete(command);

        const pull = require(`../../commands/${category}/${command}`);
        client.commands.set(command, pull);

        return message.channel.send({ embeds: [createEmbed({ description: `✅ **Przeładowano komendę** \`\`${command}\`\`**!**` })] });
    } catch {
        return message.channel.send({ embeds: [messageEmbeds.catch_error] });
    };
};

exports.info = {
    name: "reload",
    owner: true
};