'use strict';

const { createEmbed } = require('../../utils/embedCreator.js');

module.exports = {
    name: 'help',
    aliases: ['h'],
    run: async (_client, message) => {
        return message.channel.send({
            embeds: [
                createEmbed({
                    title: `📰 Lista komend`,
                    description: '``Leave`` - **Bot wychodzi z kanału**\n``Volume [liczba]`` - **Zmienia głośność**\n``Clear`` - **Usuwa aktualną playlistę**\n``Play <tytuł lub link>`` - **Odtwarza wybraną piosenkę**\n``Loop [off | track | queue]`` - **Włącza lub wyłącza powtarzanie**\n``Skip`` - **Rozpoczyna głosowanie na pominięcie piosenki**\n``Forceskip`` - **Pomija piosenkę**\n``Nowplaying`` - **Informacje o obecnym utworze**\n``Ping`` - **Wyświetla aktualny ping bota**\n``Pause`` - **Zatrzymuje odtwarzanie piosenki**\n``Resume`` - **Wznawia zatrzymaną piosenkę**\n``Shuffle`` - **Przetasowuje bieżącą playlistę**\n``Queue`` - **Wyświetla listę piosenek w playliście**\n``Uptime`` - **Pokazuje informacje o bocie**\n``Seek <liczba np. 1:12>`` - **Zmienia pozycję odtwarzania**\n``Back`` - **Odtwarza poprzednią piosenkę**\n``Filters [clear]`` - **Wyświetla listę dostępnych filtrów lub je wyłącza**\n``Autoplay`` - **Przełącza automatyczne odtwarzanie**\n``Save`` - **Wysyła w prywatnej wiadomości bieżącą piosenkę**\n``Remove <liczba>`` - **Pozwala usunąć z playlisty wybraną piosenkę**\n``Jump <liczba>`` - **Pozwala przeskoczyć odtwarzanie na wybraną piosenkę**\n``Move <liczba, liczba>`` - **Przenosi piosenkę do wybranego miejsca w playliście**\n``Reply`` - **Dodaje na początek playlisty aktualnie odtwarzaną piosenkę**\n``Lyrics [nazwa]`` - **Wyświetla tekst do aktualnej lub wybranej piosenki**\n``Prefix <prefix>`` - **Pozwala zmienić prefix na serwerze**\n``Prefix clear`` - **Ustawia domyślny prefix na serwerze**\n``Dj <rola>`` - **Ustawia rolę DJ na serwerze**\n``Dj remove`` - **Usuwa ustawioną rolę DJ**\n``Settings`` - **Sprawdza ustawienia dla serwera**'
                })
            ]
        });
    }
};
