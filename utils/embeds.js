'use strict';

const { EmbedBuilder } = require('discord.js');

const embeds = {
    queue_error: new EmbedBuilder()
        .setDescription('❌ **Nie gram żadnej piosenki!**')
        .setColor('Red'),

    voice_error: new EmbedBuilder()
        .setDescription('❌ **Nie jesteś na moim kanale głosowym!**')
        .setColor('Red'),

    member_voice_error: new EmbedBuilder()
        .setDescription('❌ **Nie jesteś na kanale głosowym!**')
        .setColor('Red'),

    bot_voice_error: new EmbedBuilder()
        .setDescription('❌ **Nie mam mnie na kanale głosowym!**')
        .setColor('Red'),

    track_error: new EmbedBuilder()
        .setDescription('❌ **Nie znaleziono takiej piosenki!**')
        .setColor('Red'),

    number_error: new EmbedBuilder()
        .setDescription('❌ **Nieprawidłowa liczba!**')
        .setColor('Red'),

    max_volume_error: new EmbedBuilder()
        .setDescription('❌ **Zakres głośności musi wynosić 1-200!**')
        .setColor('Red'),

    already_volume_error: new EmbedBuilder()
        .setDescription('❌ **Podana głośność jest obecnie używana!**')
        .setColor('Red'),

    track_queue_error: new EmbedBuilder()
        .setDescription('❌ **Nie ma żadnych piosenek w playliście!**')
        .setColor('Red'),

    already_voted_error: new EmbedBuilder()
        .setDescription('❌ **Już zagłosowałeś!**')
        .setColor('Red'),

    track_shuffle_error: new EmbedBuilder()
        .setDescription('❌ **Nie ma żadnych piosenek do przetasowania!**')
        .setColor('Red'),

    time_seek_error: new EmbedBuilder()
        .setDescription('❌ **Podany czas jest większa od długości utworu, lub równy!**')
        .setColor('Red'),

    send_dm_error: new EmbedBuilder()
        .setDescription('❌ **Nie mogę wysłać do ciebie wiadomości prywatnej!**')
        .setColor('Red'),

    resumed_error: new EmbedBuilder()
        .setDescription('❌ **Piosenka nie jest zatrzymana!**')
        .setColor('Red'),

    paused_error: new EmbedBuilder()
        .setDescription('❌ **Piosenka jest już zatrzymana!**')
        .setColor('Red'),

    loop_off_error: new EmbedBuilder()
        .setDescription('❌ **Powtarzanie jest wyłączone!**')
        .setColor('Red'),

    loop_track_error: new EmbedBuilder()
        .setDescription('❌ **Powtarzanie piosenki jest już włączone!**')
        .setColor('Red'),

    loop_queue_error: new EmbedBuilder()
        .setDescription('❌ **Powtarzanie playlisty jest już włączone!**')
        .setColor('Red'),

    track_clear_error: new EmbedBuilder()
        .setDescription('❌ **Nie ma żadnych piosenek do wyczyszczenia!**')
        .setColor('Red'),
    track_back_error: new EmbedBuilder()
        .setDescription('❌ **Nie ma poprzedniego utworu!**')
        .setColor('Red'),

    same_prefix_error: new EmbedBuilder()
        .setDescription('❌ **Musisz podać nowy prefix!**')
        .setColor('Red'),

    already_prefix_error: new EmbedBuilder()
        .setDescription('❌ **Ten prefix jest już używany!**')
        .setColor('Red'),

    prefix_change_error: new EmbedBuilder()
        .setDescription('❌ **Wystąpił błąd poczas zmiany prefixu!**')
        .setColor('Red'),

    lyrics_error: new EmbedBuilder()
        .setDescription('❌ **Nie udało mi się znaleźć tekstu do tego utworu!**')
        .setColor('Red'),

    role_error: new EmbedBuilder()
        .setDescription('❌ **Nie znaleziono takiej roli!**')
        .setColor('Red'),

    already_role_error: new EmbedBuilder()
        .setDescription('❌ **Ta rola jest już ustawiona!**')
        .setColor('Red'),

    dj_set_error: new EmbedBuilder()
        .setDescription('❌ **Nie ustawiono DJ roli!**')
        .setColor('Red'),

    args_category_error: new EmbedBuilder()
        .setDescription('❌ **Musisz podać nazwę kategorii!**')
        .setColor('Red'),

    args_command_error: new EmbedBuilder()
        .setDescription('❌ **Musisz podać nazwę komendy!**')
        .setColor('Red'),

    args_status_error: new EmbedBuilder()
        .setDescription('❌ **Musisz podać nazwę statusu!**')
        .setColor('Red'),

    permission_error: new EmbedBuilder()
        .setDescription('❌ **Nie posiadasz permisji by to zrobić!**')
        .setColor('Red'),

    dj_permission_error: new EmbedBuilder()
        .setDescription('❌ **Nie posiadasz roli DJ!**')
        .setColor('Red'),

    empty_queue_error: new EmbedBuilder()
        .setDescription('❌ **Skończyła się muzyka w playliście!**')
        .setColor('Red'),

    player_error: new EmbedBuilder()
        .setDescription('❌ **Błąd podczas odtwarzania utworu!**')
        .setColor('Red'),
};

module.exports = embeds;