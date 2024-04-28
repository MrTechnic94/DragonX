'use strict';

const config = require('../config/default.js');
const { createEmbed } = require('./embedCreator.js');

const generateEmbed = (description) => createEmbed({ description });

// Stworzenie zmiennej z gotowymi wiadomosciami do wywolania
const messageEmbeds = {
    queue_error: generateEmbed('❌ **Nie ma piosenek w playliście!**'),
    voice_error: generateEmbed('❌ **Nie jesteś na moim kanale głosowym!**'),
    member_voice_error: generateEmbed('❌ **Nie jesteś na kanale głosowym!**'),
    bot_voice_error: generateEmbed('❌ **Nie mam mnie na kanale głosowym!**'),
    track_error: generateEmbed('❌ **Nie znaleziono takiej piosenki!**'),
    track_back_error: generateEmbed('❌ **Nie ma poprzedniej piosenki!**'),
    number_error: generateEmbed('❌ **Nieprawidłowa liczba!**'),
    max_volume_error: generateEmbed('❌ **Zakres głośności musi wynosić 1-200!**'),
    already_volume_error: generateEmbed('❌ **Podana głośność jest obecnie używana!**'),
    muted_player_error: generateEmbed('❌ **Odtwarzacz jest wyciszony!**'),
    muted_bot_error: generateEmbed('❌ **Jestem wyciszony!**'),
    already_voted_error: generateEmbed('❌ **Już zagłosowałeś!**'),
    time_seek_error: generateEmbed('❌ **Podany czas jest większy lub równy od długości piosenki!**'),
    send_dm_error: generateEmbed('❌ **Nie mogę wysłać do Ciebie wiadomości prywatnej!**'),
    same_prefix_error: generateEmbed('❌ **Musisz podać nowy prefix!**'),
    already_prefix_error: generateEmbed('❌ **Ten prefix jest już używany!**'),
    prefix_change_error: generateEmbed('❌ **Wystąpił błąd poczas zmiany prefixu!**'),
    role_error: generateEmbed('❌ **Nie znaleziono takiej roli!**'),
    already_role_error: generateEmbed('❌ **Ta rola jest już ustawiona!**'),
    dj_set_error: generateEmbed('❌ **Nie ustawiono DJ roli!**'),
    args_category_error: generateEmbed('❌ **Musisz podać nazwę kategorii!**'),
    args_command_error: generateEmbed('❌ **Musisz podać nazwę komendy!**'),
    args_status_error: generateEmbed('❌ **Musisz podać nazwę statusu!**'),
    args_guild_id_error: generateEmbed('❌ **Musisz podać id guildi!**'),
    args_cmd_error: generateEmbed('❌ **Musisz podać komendę do wykonania!**'),
    permission_error: generateEmbed('❌ **Nie posiadasz permisji by to zrobić!**'),
    dj_permission_error: generateEmbed('❌ **Nie posiadasz roli DJ!**'),
    empty_queue_error: generateEmbed('❌ **Skończyła się muzyka w playliście!**'),
    player_error: generateEmbed('❌ **Wystąpił błąd podczas odtwarzania piosenki!**'),
    catch_error: generateEmbed('❌ **Wystąpił nieoczekiwany błąd!**'),
    filters_error: generateEmbed('❌ **Żaden filtr nie jest włączony!**'),
    max_filters_enabled_error: generateEmbed(`❌ **Jednocześnie może być włączony tylko ${config.maxFiltersEnabled} filtr!**`),
    shuffle_error: generateEmbed('❌ **Wymagane są co najmniej 3 piosenki w playliście!**'),
    full_channel_error: generateEmbed('❌ **Kanał głosowy jest pełny!**'),
    same_move_error: generateEmbed('❌ **Nie można przenieść piosenki w to samo miejsce!**'),
    no_found_lyrics_error: generateEmbed('❌ **Nie znaleziono tekstu do tej piosenki!**'),
    no_lyrics_args_error: generateEmbed('❌ **Podaj nazwę piosenki lub włącz jej odtwarzanie!**'),
    send_dm_success: generateEmbed('✅ **Sprawdź wiadomości prywatne!**'),
    remove_dj_success: generateEmbed('✅ **Usunięto DJ rolę!**'),
    restart_bot_success: generateEmbed('✅ **Restartowanie bota...**'),
    skip_success: generateEmbed('⏩ **Pominięto aktualną piosenkę!**'),
    shuffle_success: generateEmbed('🔀 **Playlista została przetasowana!**'),
    track_back_success: generateEmbed('◀️ **Odtwarzam poprzednią piosenkę!**'),
    clear_success: generateEmbed('💨 **Playlista została wyczyszczona!**'),
    disabled_filters_success: generateEmbed('🎵 **Wszystkie filtry zostały wyłączone!**')
};

module.exports = messageEmbeds;