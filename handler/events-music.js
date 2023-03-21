'use strict';

module.exports = client => {

    const { readdirSync } = require('fs');

    const eventload = () => {
        
        const events = readdirSync(`./events-music/`).filter(files => files.endsWith(".js"));
        
            for(const file of events) {
                const evn = require(`../events-music/${file}`);
                console.log((`[`) + "\x1b[36m" + (`Handler`) + "\x1b[0m" + (`]`) + ` Zaladowano wydarzenie ${file}`);
                client.player.events.on(file.split(".")[0], (...args) => evn.run(client, ...args));
            
            }
    };

    eventload();
};