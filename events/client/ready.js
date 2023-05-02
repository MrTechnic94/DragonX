'use strict';

const { ActivityType } = require('discord.js');
const mongoose = require('mongoose');

exports.run = async (client) => {
    // Zaladowanie statusu bota
    client.user.setPresence({activities: [{name: process.env.STATUS, type: ActivityType.Playing}], status: 'idle'});
    setTimeout(() => { 
    client.user.setPresence({activities: [{name: process.env.STATUSTWO, type: ActivityType.Listening}], status: 'online'});
    }, 3000);

    // Zalogowanie do bazy danych
    await mongoose.connect(`mongodb://${process.env.DBUSER}:${process.env.DBPASSWORD}@${process.env.DBHOST}/?authSource=admin`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() =>
        console.log(`\x1b[0m[${"\x1b[36m"}Database${"\x1b[0m"}] Polaczono do bazy danych!`)
    ).catch(error =>
        console.error(`[${"\x1b[31m"}Error${"\x1b[0m"}] \x1b[31mBlad podczas laczenia z baza danych!\n${error}`)
    );
    
    console.log(`[\x1b[31mBot\x1b[0m] \x1b[31m${client.user.tag} zalogowal sie!\x1b[0m`);
};

exports.info = {
    once: true
};