const { MessageEmbed } = require('discord.js');
const premiumSchema = require('../../models/premium.js');
require('dotenv').config({ path: __dirname + '../../.env' });

exports.run = async (client, message, args) => {
    
    if (message.author.id !== process.env.OWNER) return;

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if (!member) return message.reply('Proszę podać prawidłowego członka!');

    premiumSchema.findOne({
        User: member.id,
    }, async(err, data) => {
    if (!data) return message.reply('Nie znaleziono użytkownika w bazie danych!');

    data.delete();
    message.reply({embeds:[new MessageEmbed().setDescription(`Usunięto ${member} użytkownika z bazy danych!`).setColor("RED")]});

    });
}

exports.info = {
    name: "delete-premium",
    aliases: ['del-premium']
}