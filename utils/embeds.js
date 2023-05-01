'use strict';

const { createEmbed } = require('./embedCreator.js');

module.exports = {
    queue_error: createEmbed({
        description: '❌ **Nie gram żadnej piosenki!**'
    }),

    voice_error: createEmbed({
        description: '❌ **Nie jesteś na moim kanale głosowym!**'
    }),

    member_voice_error: createEmbed({
        description: '❌ **Nie jesteś na kanale głosowym!**'
    }),

    bot_voice_error: createEmbed({
        description: '❌ **Nie mam mnie na kanale głosowym!**'
    }),

    track_error: createEmbed({
        description: '❌ **Nie znaleziono takiej piosenki!**'
    }),

    number_error: createEmbed({
        description: '❌ **Nieprawidłowa liczba!**'
    }),

    max_volume_error: createEmbed({
        description: '❌ **Zakres głośności musi wynosić 1-200!**'
    }),

    already_volume_error: createEmbed({
        description: '❌ **Podana głośność jest obecnie używana!**'
    }),

    track_queue_error: createEmbed({
        description: '❌ **Nie ma żadnych piosenek w playliście!**'
    }),

    already_voted_error: createEmbed({
        description: '❌ **Już zagłosowałeś!**'
    }),

    track_shuffle_error: createEmbed({
        description: '❌ **Nie ma żadnych piosenek do przetasowania!**'
    }),

    time_seek_error: createEmbed({
        description: '❌ **Podany czas jest większy lub równy od długości utworu!**'
    }),

    send_dm_error: createEmbed({
        description: '❌ **Nie mogę wysłać do ciebie wiadomości prywatnej!**'
    }),

    resumed_error: createEmbed({
        description: '❌ **Piosenka nie jest zatrzymana!**'
    }),

    paused_error: createEmbed({
        description: '❌ **Piosenka jest już zatrzymana!**'
    }),

    loop_off_error: createEmbed({
        description: '❌ **Powtarzanie jest wyłączone!**'
    }),

    loop_track_error: createEmbed({
        description: '❌ **Powtarzanie piosenki jest już włączone!**'
    }),

    loop_queue_error: createEmbed({
        description: '❌ **Powtarzanie playlisty jest już włączone!**'
    }),

    track_clear_error: createEmbed({
        description: '❌ **Nie ma żadnych piosenek do wyczyszczenia!**'
    }),

    track_back_error: createEmbed({
        description: '❌ **Nie ma poprzedniego utworu!**'
    }),

    same_prefix_error: createEmbed({
        description: '❌ **Musisz podać nowy prefix!**'
    }),

    already_prefix_error: createEmbed({
        description: '❌ **Ten prefix jest już używany!**'
    }),

    prefix_change_error: createEmbed({
        description: '❌ **Wystąpił błąd poczas zmiany prefixu!**'
    }),

    lyrics_error: createEmbed({
        description: '❌ **Nie udało mi się znaleźć tekstu do tego utworu!**'
    }),

    role_error: createEmbed({
        description: '❌ **Nie znaleziono takiej roli!**'
    }),

    already_role_error: createEmbed({
        description: '❌ **Ta rola jest już ustawiona!**'
    }),

    dj_set_error: createEmbed({
        description: '❌ **Nie ustawiono DJ roli!**'
    }),

    args_category_error: createEmbed({
        description: '❌ **Musisz podać nazwę kategorii!**'
    }),

    args_command_error: createEmbed({
        description: '❌ **Musisz podać nazwę komendy!**'
    }),

    args_status_error: createEmbed({
        description: '❌ **Musisz podać nazwę statusu!**'
    }),

    permission_error: createEmbed({
        description: '❌ **Nie posiadasz permisji by to zrobić!**'
    }),

    dj_permission_error: createEmbed({
        description: '❌ **Nie posiadasz roli DJ!**'
    }),

    empty_queue_error: createEmbed({
        description: '❌ **Skończyła się muzyka w playliście!**'
    }),

    player_error: createEmbed({
        description: '❌ **Wystąpił błąd podczas odtwarzania utworu!**'
    }),

    restart_error: createEmbed({
        description: '❌ **Wystąpił błąd podczas restartu!**'
    }),

    send_dm_succes: createEmbed({
        description: '✅ **Sprawdź wiadomości prywatne!**'
    })
};
