'use strict';

// Utworzenie funckji parseTime potrzebnej do konwersji czasu z formatu hh:mm:ss na milisekundy
function parseTime(timeString) {
    const timeParts = /^((\d{1,2}):)?(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?$/.exec(timeString);
    if (!timeParts) return null;

    const hours = timeParts[2] ? parseInt(timeParts[2], 10) : 0;
    const minutes = parseInt(timeParts[3], 10);
    const seconds = parseInt(timeParts[4], 10);
    const milliseconds = timeParts[5] ? parseInt(timeParts[5], 10) : 0;

    return ((hours * 3600) + (minutes * 60) + seconds) * 1000 + milliseconds;
}

// Utworzenie funkcji formatTime potrzebnej do formatowania milisekund na czytelny czas w formacie dd:hh:mm:ss
function formatTime(milliseconds) {
    const days = Math.floor(milliseconds / 86400000);
    const hours = Math.floor((milliseconds % 86400000) / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);

    const parts = [];
    if (days) parts.push(`${days}d`);
    if (hours) parts.push(`${hours}h`);
    if (minutes) parts.push(`${minutes}m`);
    if (seconds) parts.push(`${seconds}s`);

    return parts.length ? parts.join(' ') : '0s';
}

module.exports = { parseTime, formatTime };