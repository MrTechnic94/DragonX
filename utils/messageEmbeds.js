'use strict';

const { playerOptions } = require('../config/default');
const { createEmbed } = require('./embedCreator');

// Zmienna z gotowymi wiadomosciami
const messages = {
    // Wiadomosci z errorem
    queue_error: '❌ **Nie ma piosenek w playliście**',
    voice_error: '❌ **Nie jesteś na moim kanale głosowym**',
    member_voice_error: '❌ **Nie jesteś na kanale głosowym**',
    bot_voice_error: '❌ **Nie mam mnie na kanale głosowym**',
    track_error: '❌ **Nie znaleziono takiej piosenki**',
    track_back_error: '❌ **Nie ma poprzedniej piosenki**',
    number_error: '❌ **Nieprawidłowa liczba**',
    max_volume_error: '❌ **Zakres głośności musi wynosić 1-200**',
    already_volume_error: '❌ **Podana głośność jest obecnie używana**',
    muted_player_error: '❌ **Odtwarzacz jest wyciszony**',
    muted_bot_error: '❌ **Jestem wyciszony**',
    already_voted_error: '❌ **Już zagłosowałeś**',
    time_seek_error: '❌ **Podany czas jest większy lub równy długości piosenki**',
    send_dm_error: '❌ **Nie mogę wysłać do Ciebie wiadomości prywatnej**',
    same_prefix_error: '❌ **Musisz podać nowy prefix**',
    already_prefix_error: '❌ **Ten prefix jest już używany**',
    prefix_change_error: '❌ **Wystąpił błąd poczas zmiany prefixu**',
    role_error: '❌ **Nie znaleziono takiej roli**',
    already_role_error: '❌ **Ta rola jest już ustawiona**',
    dj_set_error: '❌ **Nie ustawiono DJ roli**',
    args_category_error: '❌ **Musisz podać nazwę kategorii**',
    args_command_error: '❌ **Musisz podać nazwę komendy**',
    args_status_error: '❌ **Musisz podać nazwę statusu**',
    args_guild_id_error: '❌ **Musisz podać id guildi**',
    args_cmd_error: '❌ **Musisz podać komendę do wykonania**',
    permission_error: '❌ **Nie posiadasz permisji by to zrobić**',
    dj_permission_error: '❌ **Nie posiadasz roli DJ**',
    empty_queue_error: '❌ **Skończyła się muzyka w playliście**',
    player_error: '❌ **Wystąpił błąd odtwarzacza**',
    catch_error: '❌ **Wystąpił nieoczekiwany błąd**',
    filters_error: '❌ **Żaden filtr nie jest włączony**',
    max_filters_enabled_error: `❌ **Jednocześnie może być włączony tylko \`${playerOptions.maxFiltersEnabled}\` filtr**`,
    shuffle_error: '❌ **Wymagane są co najmniej 3 piosenki w playliście**',
    full_channel_error: '❌ **Kanał głosowy jest pełny**',
    same_move_error: '❌ **Nie można przenieść piosenki w to samo miejsce**',
    no_found_lyrics_error: '❌ **Nie znaleziono tekstu dla tej piosenki**',
    no_lyrics_args_error: '❌ **Podaj nazwę piosenki lub włącz jej odtwarzanie**',
    resumed_error: '❌ **Odtwarzacz nie jest zatrzymany**',
    paused_error: '❌ **Odtwarzacz jest już zatrzymany**',

    // Wiadomosci z sukcesem
    send_dm_success: '✅ **Sprawdź wiadomości prywatne**',
    remove_dj_success: '✅ **Usunięto DJ rolę**',
    restart_bot_success: '✅ **Restartowanie bota...**',
    skip_success: '⏩ **Pominięto aktualną piosenkę**',
    shuffle_success: '🔀 **Playlista została przetasowana**',
    track_back_success: '◀️ **Odtwarzam poprzednią piosenkę**',
    clear_success: '💨 **Playlista została wyczyszczona**',
    disabled_filters_success: '🎵 **Wszystkie filtry zostały wyłączone**',
    resume_success: '⏸️ **\`Wznowiono\` odtwarzanie piosenki**',
    pause_success: '▶️ **\`Zatrzymano\` odtwarzanie piosenki**'
};

// Generowanie gotowych wiadomosci
const messageEmbeds = Object.fromEntries(Object.entries(messages).map(([key, description]) => [key, createEmbed({ description })]));

module.exports = messageEmbeds;