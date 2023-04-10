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
    if (!data) return message.reply('Ten użytkownik posiada już funkcje premium!')

    new premiumSchema({
        User: member.id,
    }).save();
    return message.reply({embeds:[new MessageEmbed().setDescription(`Dodano ${member} do funkcji premium!`).setColor("GREEN")]});
    
        }
    );
}


exports.info = {
    name: "add-premium",
}