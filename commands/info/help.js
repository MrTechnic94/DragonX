'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (_client, message) => {

    const embed = new EmbedBuilder()
    .setTitle("📰 Lista komend")
    .setDescription("``Leave`` - **Bot wychodzi z kana\u0142u**\r\n``Volume`` - **Zmiana g\u0142o\u015Bno\u015Bci**\r\n``Clear`` - **Usuwa aktualn\u0105 kolejk\u0119**\r\n``Play`` - **Odtwarzanie piosenki przez bota**\r\n``Loop <off | track | queue>`` - **Powtarza aktualn\u0105 piosenk\u0119 lub kolejk\u0119**\n``Skip`` - **Pomija piosenk\u0119**\r\n``Nowplaying`` - **Informacje o obecnym utworze**\r\n``Ping`` - **Wy\u015Bwietla aktualny ping bota**\r\n``Pause`` - **Zatrzymuje odtwarzanie piosenki**\r\n``Resume`` - **Wznowienie odtwarzania piosenki**\r\n``Shuffle`` - **Przemieszanie playlisty**\r\n``Queue`` - **Wy\u015Bwietla list\u0119 utwor\u00F3w w kolejce\n**``Uptime`` - **Podstawowe informacje o bocie**\n``Seek`` - **Zmienia pozycj\u0119 odtwarzania**\n``Back`` - **Odtwarzanie poprzedniej piosenki**\n``Filters`` - **Wy\u015Bwietla list\u0119 wszystkich filtr\u00F3w**\n``Autoplay <on | off>`` - **Automatycznie odtwarza nast\u0119pny utw\u00F3r**\n``Save`` - **Zapisuje obecny utw\u00F3r i wysy\u0142a w prywatnej wiadomości**\n``Remove <liczba>`` - **Pozwala usun\u0105\u0107 z playlisty wybrany utw\u00F3r**\n``Jump <liczba>`` - **Pozwala przeskoczy\u0107 odtwarzanie na wybrany utw\u00F3r**")
    .setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
    .setColor("Gold")

    return message.reply({embeds: [embed]});

};

exports.info = {
    name: "help"
};
