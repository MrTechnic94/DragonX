'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message, args) => {

    if (message.author.id !== process.env.OWNER) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie posiadasz permisji by to zrobić!**`).setColor("Red")]});

    if (!args[0]) return message.reply({embeds: [new EmbedBuilder().setTitle("❌ Musisz podać nazwę kategorii!").setColor("Red")]});
    if (!args[1]) return message.reply({embeds: [new EmbedBuilder().setTitle("❌ Musisz podać nazwę komendy!").setColor("Red")]});

        let category = args[0].toLowerCase();
        let command = args[1].toLowerCase();

        try {
            delete require.cache[require.resolve(`../../commands/${category}/${command}`)];
            await client.commands.delete(command);

            const pull = require(`../../commands/${category}/${command}`);
            await client.commands.set(command, pull);

            return message.reply({embeds: [new EmbedBuilder().setDescription(`✅ **Przeładowano komendę** \`\`${command}\`\`!`).setColor("Red")]});
        } catch {
            return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Błąd w przeładowaniu komendy** \`\`${command}\`\`!`).setColor("Red")]});
        }

};

exports.info = {
    name: "reload"
};