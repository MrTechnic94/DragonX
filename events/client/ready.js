'use strict'

const { Client } = require('discord.js');
require('dotenv').config({ path: __dirname + '../../.env' });
const clc = require('cli-color');

exports.run = async (client) => {

    // -----> Status Bota <-----
    client.user.setPresence({ activities: [{ name: process.env.STATUSONE, type: 'PLAYING' }], status: 'idle' });
    setTimeout(function() { 
    client.user.setPresence({ activities: [{ name: process.env.STATUSTWO, type: 'LISTENING' }], status: 'online' });
    }, 3000);

    console.log(clc.cyanBright(`${client.user.tag} zostal zalogowany!`));

};