const {MessageEmbed} = require('discord.js');

exports.run = async (client, message) => {

    const queue = client.player.getQueue(message.guild.id);    

    connection.destroy();
    return message.reply({embeds:[new MessageEmbed().setTitle("🔮 Wychodzę z kanału!").setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("GOLD")]});

};

exports.info = {
    name: "leave"
}