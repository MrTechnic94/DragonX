'use strict';

const { EmbedBuilder } = require('discord.js');
const embeds = require('../../utils/embeds.js');

exports.run = async (client, message, args) => {
    if (!args[0]) return message.reply({embeds: [embeds.args_category_error]});
    if (!args[1]) return message.reply({embeds: [embeds.args_command_error]});

        let category = args[0].toLowerCase();
        let command = args[1].toLowerCase();

        try {
            delete require.cache[require.resolve(`../../commands/${category}/${command}`)];
            await client.commands.delete(command);

            const pull = require(`../../commands/${category}/${command}`);
            await client.commands.set(command, pull);

            return message.reply({embeds: [new EmbedBuilder().setDescription(`✅ **Przeładowano komendę** \`\`${command}\`\`!`).setColor('Red')]});
        } catch {
            return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Błąd w przeładowaniu komendy** \`\`${command}\`\`!`).setColor('Red')]});
        };
};

exports.info = {
    name: "reload",
    owner: true
};