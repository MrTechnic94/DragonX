const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {

    if(message.author.id == '586543379295240192') {

    let argument1 = args.join(' ');
    client.user.setPresence({ activities: [{ name: argument1, type: 'LISTENING' }]});

    const embed = new MessageEmbed()
    .setTitle("✅ Pomyślnie ustawiono status!")
    .setDescription(`Status został zmieniony na \`\`${argument1}\`\``)
    .setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
    .setColor("GREEN")

    return message.reply({embeds: [embed]})

    } else {

    const embed = new MessageEmbed()
    .setTitle("❌ Błąd!")
    .setDescription(`Status nie został zmieniony!`)
    .setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
    .setColor("RED")

    return message.reply({embeds: [embed]})

    }
}

exports.info = {
    name: "status"
}