'use strict';

const { PresenceUpdateStatus, ActivityType, GatewayIntentBits, Options } = require('discord.js');

// Ustawienia klienta discord.js
module.exports.clientOptions = {
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
    makeCache: Options.cacheWithLimits({
        ...Options.DefaultMakeCacheSettings,
        MessageManager: 25,
        ThreadManager: 25,
        PresenceManager: 0,
        ReactionManager: 0,
        GuildMemberManager: {
            maxSize: 50,
            keepOverLimit: member => member.id === member.client.user.id
        }
    }),
    sweepers: {
        ...Options.DefaultSweeperSettings,
        messages: {
            interval: 3600,
            lifetime: 1800
        },
        users: {
            interval: 3600,
            filter: () => user => user.id !== user.client.user.id
        }
    },
    presence: {
        status: PresenceUpdateStatus.Online,
        activities: [{
            name: '❓d!help 🎵d!play',
            type: ActivityType.Custom
        }]
    },
    allowedMentions: {
        parse: ['users', 'roles'],
        repliedUser: true
    }
};

// Ustawienia odtwarzacza discord-player
module.exports.clientPlayerOptions = {
    leaveOnEndCooldown: 240000,
    leaveOnEmptyCooldown: 60000,
    leaveOnStop: true,
    pauseOnEmpty: true,
    maxQueueSize: 10000,
    bufferingTimeout: 3000,
    connectionTimeout: 20000
};

// Pozostale ustawienia odtwarzacza discord-player
module.exports.playerOptions = {
    useLegacyFFmpeg: false,
    skipFFmpeg: false,
    maxFiltersEnabled: 1,
    audioQuality: 'highestaudio'
};

// Inne ustawienia
module.exports.embedOptions = {
    embedColor: 0xED4245,
    devEmbedColor: 0x6133FF
};