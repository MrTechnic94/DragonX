const { Client } = require('discord.js');
require('dotenv').config({ path: __dirname + '../../.env' });

exports.run = async (client) => {

    client.user.setPresence({ activities: [{ name: process.env.BOTSTATUSONE, type: 'PLAYING' }], status: 'idle' });
    setTimeout(function() { 
    client.user.setPresence({ activities: [{ name: process.env.BOTSTATUS, type: 'LISTENING' }], status: 'online' });
    }, 3000);

    console.log(`${client.user.tag} zostal zalogowany!`);

    
client.on('interactionCreate', interaction => {
	if (!interaction.isCommand()) return;
	console.log(interaction);
});


};