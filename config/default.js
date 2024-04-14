'use strict';

const { PresenceUpdateStatus, ActivityType, GatewayIntentBits, Partials } = require('discord.js');

module.exports = {
    // Konfiguracja klienta discord.js
    restRequestTimeout: 60000,
    messageEditHistoryMaxSize: 0,
    messageCacheMaxSize: 25,
    messageSweepInterval: 43200,
    messageCacheLifetime: 21600,
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.GuildMember
    ],
    presence: {
        status: PresenceUpdateStatus.Online,
        activities: [{
            name: '❓d!help 🎵d!play',
            type: ActivityType.Listening
        }]
    },
    allowedMentions: {
        parse: ['users', 'roles'],
        repliedUser: true
    },

    // Konfiguracja odtwarzacza discord-player
    leaveOnEndCooldown: 240000,
    leaveOnEmptyCooldown: 60000,
    leaveOnStop: true,
    pauseOnEmpty: true,
    maxQueueSize: 10000,
    bufferingTimeout: 3000,
    connectionTimeout: 20000,
    useLegacyFFmpeg: false,
    skipFFmpeg: true,
    audioQuality: 'highestaudio'
};
