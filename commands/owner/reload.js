'use strict'

const { MessageEmbed } = require('discord.js');
require('dotenv').config({ path: __dirname + '../../.env' })

exports.run = async (client, message, args) => {

    if (message.author.id == process.env.OWNER) {

    if (!args[0]) return message.reply({embeds: [new MessageEmbed().setTitle("❌ Musisz podać nazwę kategori!").setColor("RED").setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})]});
    if (!args[1]) return message.reply({embeds: [new MessageEmbed().setTitle("❌ Musisz podać nazwę komendy!").setColor("RED").setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})]});

        let category = args[0].toLowerCase();
        let command = args[1].toLowerCase();

        try {
            delete require.cache[require.resolve(`../../commands/${category}/${command}`)];
            await client.commands.delete(command);

            const pull = require(`../../commands/${category}/${command}`);
            await client.commands.set(command, pull);

            return message.reply({embeds: [new MessageEmbed().setTitle(`✅ Przeładowano komendę \`\`${command}\`\`!`).setColor("RED")]});
        } catch(error) {
            return message.reply({embeds: [new MessageEmbed().setTitle(`❌ Błąd w przeładowaniu komendy \`\`${command}\`\`!`).setColor("RED")]});
        }
    }   

}

exports.info = {
    name: "reload"
}