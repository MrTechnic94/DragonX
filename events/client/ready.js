'use strict';

const { ActivityType } = require('discord.js');
require('dotenv').config({ path: `${__dirname}/../../.env` });

exports.run = async (client) => {
    
    const p = process.env.PREFIX;
    
    // -----> Status bota <-----
    client.user.setPresence({ activities: [{ name: "🌙 Connecting...", type: ActivityType.Playing }], status: 'idle' });
    setTimeout(() => { 
    client.user.setPresence({ activities: [{ name: `❓ ${p}help 🎵 ${p}play`, type: ActivityType.Listening }], status: 'online' });
    }, 3000);

    console.log(`[\x1b[31mBot\x1b[0m] \x1b[31m${client.user.tag} zalogowal sie!\x1b[0m`);

};
