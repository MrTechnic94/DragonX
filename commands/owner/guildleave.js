const { MessageEmbed } = require('discord.js');
require('dotenv').config({ path: __dirname + '../../.env' })

exports.run = async (client, message, args) => {
    
    if (message.author.id == process.env.OWNER) {

    let guild = client.guilds.cache.get(args[0])
    if (!guild) return message.channel.send(`Nie znaleziono guildi z id \`\`${guild}\`\``)

    await guild.leave();

    return message.reply({embeds:[new MessageEmbed().setTitle(`✅ Pomyślnie bot wyszedł z gildi!`).setDescription(`**Guild name:**\n \`\`\`${guild.name}\`\`\`\n **Guild id:**\n \`\`\`${guild.id}\`\`\` `).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("RED")]});

    } else {
    
    message.channel.send('❌ Nie masz uprawnień do użycia tej komendy!');

    }
};

exports.info = {
    name: "guildleave",
    aliases: ['gleave']
}