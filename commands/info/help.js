'use strict'

const { MessageEmbed } = require('discord.js');

exports.run = async (client, message) => {

    const embed = new MessageEmbed()
    .setTitle("📰 Lista komend")
    .setDescription("``Join`` - **Bot Do\u0142\u0105cza na Kana\u0142**\r\n``Leave`` - **Bot Wychodzi z Kana\u0142u**\r\n``Volume`` - **Zmiana g\u0142o\u015Bno\u015Bci**\r\n``Clear`` - **Usuwa aktualn\u0105 kolejk\u0119**\r\n``Play`` - **Odtwarzanie Piosenki Przez Bota**\r\n``Loop`` - **Powtarza Aktualn\u0105 Piosenk\u0119**\r\n``Skip`` - **Pomija Piosenk\u0119**\r\n``Nowplaying`` - **Informacje o Obecnym Utworze**\r\n``Unloop`` - **Usuwa Powtarzan\u0105 Piosenk\u0119**\r\n``Ping`` - **Wy\u015Bwietla Aktualny Ping Bota**\r\n``Pause`` - **Zatrzymuje Odtwarzanie Piosenki**\r\n``Resume`` - **Wznowienie Odtwarzania Piosenki**\r\n``Shuffle`` - **Przemieszanie Playlisty**\r\n``Queue`` - **Wy\u015Bwietla List\u0119 Utworz\u00F3w w Kolejce\n**\`\`Uptime\`\` - **Podstawowe Informacje o Bocie**\n\`\`Seek\`\` - **Zmienia Pozycję Odtwarzania**\n \`\`Back\`\` - **Odtwarzanie Poprzedniej Piosenki**\n``Bassboostlow <Enabled | Disabled>`` - **Pozwala trochę wzmocnić bass**\n``Bassboost <Enabled | Disabled>`` - **Pozwala bardziej wzmocnić bass**\n``Bassboosthigh <Enabled | Disabled>`` - **Pozwala jeszcze bardziej wzmocnić bass**\n``Nightcore`` - **Zmienia dźwięk muzyki**\n``Vaporwave`` - **Spowalnia odtwarzanie utworu**\n``8D`` - **Pozwala słuchać muzyki w 8D**")
    .setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
    .setColor("GOLD")

    return message.reply({embeds: [embed]})

};

exports.info = {
    name: "help"
}