module.exports = client => {

    const { readdirSync } = require('fs');
    const { sep } = require('path');

    const eventload = () => {
        const events = readdirSync(`./events-music/`).filter(files => files.endsWith(".js"));
        
            for(const file of events) {
                const evn = require(`../events-music/${file}`);
                console.log(`[Events-Music] Zaladowano wydarzenie ${file}`);
                client.player.on(file.split(".")[0], (...args) => evn.run(client, ...args));
            
            }
    };

    eventload();

};