'use strict';

function parseTime(timeString) {
    const timeParts = /^((\d{1,2}):)?(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?([ms])?$/.exec(timeString);
    if (!timeParts) return null;

    let [hours, minutes, seconds, multiplier, milliseconds] = [0, 0, 0, 1, 0];
    if (timeParts[2]) hours = parseInt(timeParts[2], 10);
    minutes = parseInt(timeParts[3], 10);
    seconds = parseInt(timeParts[4], 10);
    if (timeParts[6] === "m") multiplier = 60;
    else if (timeParts[6] === "s") multiplier = 1 / 60;
    if (timeParts[5]) milliseconds = parseInt(timeParts[5], 10) * multiplier * 1000;

    return ((hours * 3600) + (minutes * 60) + seconds) * 1000 + milliseconds;
};

module.exports = { parseTime };