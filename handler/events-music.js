'use strict';

module.exports = client => {

    const { readdirSync } = require('fs');
    const { sep } = require('path');
    const clc = require('cli-color');

    const eventload = () => {
        
        const events = readdirSync(`./events-music/`).filter(files => files.endsWith(".js"));
        
            for(const file of events) {
                const evn = require(`../events-music/${file}`);
                console.log((`[`) + clc.cyan(`Handler`) + (`]`) + ` Zaladowano wydarzenie ${file}`);
                client.player.on(file.split(".")[0], (...args) => evn.run(client, ...args));
            
            }
    };

    eventload();

};