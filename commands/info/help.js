'use strict';

const { createEmbed } = require('../../utils/embedCreator.js');

exports.run = async (_client, message) => {
    return message.channel.send({
        embeds: [
            createEmbed({
                title: `📰 Lista komend`,
                description: '``Leave`` - **Bot wychodzi z kanału**\n``Volume [liczba]`` - **Zmienia głośność**\n``Clear`` - **Usuwa aktualną playlistę**\n``Play <tytuł lub link>`` - **Odtwarza wybrany utwór**\n``Loop <off | track | queue>`` - **Włącza lub wyłącza powtarzanie**\n``Skip`` - **Rozpoczyna głosowanie na pominięcie piosenki**\n``Forceskip`` - **Pomija piosenkę**\n``Nowplaying`` - **Informacje o obecnym utworze**\n``Ping`` - **Wyświetla aktualny ping bota**\n``Pause`` - **Zatrzymuje odtwarzanie piosenki**\n``Resume`` - **Wznawia zatrzymany utwór**\n``Shuffle`` - **Przetasowuje bieżącą playlistę**\n``Queue`` - **Wyświetla listę utworów w playliście**\n``Uptime`` - **Pokazuje informacje o bocie**\n``Seek <czas np. 1:12>`` -  **Zmienia pozycję odtwarzania**\n``Back`` - **Odtwarza poprzedni utwór**\n``Filters [clear]`` - **Wyświetla listę dostępnych filtrów lub je wyłącza**\n``Autoplay`` - **Przełącza automatyczne odtwarzanie**\n``Save`` - **Zapisuje obecny utwór i wysyła w prywatnej wiadomości**\n``Remove <liczba>`` - **Pozwala usunąć z playlisty wybrany utwór**\n``Jump <liczba>`` - **Pozwala przeskoczyć odtwarzanie na wybrany utwór**\n``Move <liczba, liczba>`` - **Przenosi utwór do wybranego miejsca w playliście**\n``Reply`` - **Dodaje na początek playlisty aktualnie odtwarzany utwór**\n``Prefix <prefix>`` - **Pozwala zmienić prefix na serwerze**\n``Prefix clear`` - **Ustawia domyślny prefix na serwerze**\n``Dj <rola>`` - **Ustawia rolę DJ na serwerze**\n``Dj remove`` - **Usuwa ustawioną rolę DJ**\n``Settings`` - **Sprawdza ustawienia dla serwera**'
            })]
    });
};

exports.info = {
    name: "help",
    aliases: ["h"]
};