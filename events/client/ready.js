const { Client } = require('discord.js');
require('dotenv').config({ path: __dirname + '../../.env' });
const clc = require('cli-color');
const mongoose = require('mongoose');

exports.run = async (client) => {

    // -----> Status Bota <-----
    client.user.setPresence({ activities: [{ name: process.env.BOTSTATUSONE, type: 'PLAYING' }], status: 'idle' });
    setTimeout(function() { 
    client.user.setPresence({ activities: [{ name: process.env.BOTSTATUS, type: 'LISTENING' }], status: 'online' });
    }, 3000);

    console.log(clc.cyanBright(`${client.user.tag} zostal zalogowany!`));

    // -----> MongoDB Login <-----
    await mongoose.connect(process.env.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() =>{
        console.log('✅ Polaczono z bazy danych!');
    }).catch((err) => {
        console.log('❌ Nie polaczono sie z baza danych!');
    });

};