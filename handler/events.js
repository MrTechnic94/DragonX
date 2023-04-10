module.exports = client => {

    const { readdirSync } = require('fs');
    const { sep } = require('path');

    const eventload = () => {
        
        readdirSync('./events/').forEach(drc => {
            const events = readdirSync(`./events/${sep}${drc}${sep}`).filter(files => files.endsWith(".js"));

            for(const file of events) {
                const evn = require(`../events/${drc}/${file}`);
                console.log(`[Events] Zaladowano wydarzenie ${drc}/${events}`);
                client.on(file.split(".")[0], (...args) => evn.run(client, ...args));
            
            }
        });
    };

    eventload();

};