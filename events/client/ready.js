'use strict';

require('dotenv').config({ path: __dirname + '../../.env' });

exports.run = async (client) => {

    // -----> Status Bota <-----
    client.user.setPresence({ activities: [{ name: process.env.STATUSONE, type: 'PLAYING' }], status: 'idle' });
    setTimeout(function() { 
    client.user.setPresence({ activities: [{ name: process.env.STATUSTWO, type: 'LISTENING' }], status: 'online' });
    }, 3000);

};