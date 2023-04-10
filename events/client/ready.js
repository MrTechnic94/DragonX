const { Client } = require('discord.js');
require('dotenv').config({ path: __dirname + '../../.env' });
const clc = require('cli-color');

exports.run = async (client) => {

    client.user.setPresence({ activities: [{ name: process.env.BOTSTATUSONE, type: 'PLAYING' }], status: 'idle' });
    setTimeout(function() { 
    client.user.setPresence({ activities: [{ name: process.env.BOTSTATUS, type: 'LISTENING' }], status: 'online' });
    }, 3000);

    console.log(clc.cyanBright(`${client.user.tag} zostal zalogowany!`));

};