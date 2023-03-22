'use strict';

const { ActivityType } = require('discord.js');
require('dotenv').config({ path: __dirname + '../../.env' });

exports.run = async (client) => {
    
    const p = process.env.PREFIX;

    // -----> Status bota <-----
    client.user.setPresence({ activities: [{ name: "🌙 Connecting...", type: ActivityType.Playing }], status: 'idle' });
    setTimeout(function() { 
    client.user.setPresence({ activities: [{ name: `❓ ${p}help 🎵 ${p}play`, type: ActivityType.Listening }], status: 'online' });
    }, 3000);

};