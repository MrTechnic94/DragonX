'use strict';

module.exports = client => {
    
    const { readdirSync } = require('fs');
    const { sep } = require('path');
        
    const commandload = () => {

        readdirSync('./commands/').forEach(drc => {

            const commands = readdirSync(`./commands/${sep}${drc}${sep}`);

            for (const file of commands) {
                const pull = require(`../commands/${drc}/${file}`);

                if (pull.info && typeof pull.info.name === "string") {

                    if (client.commands.get(pull.info.name)) return console.warn((`[`) + "\x1b[31m" + (`Error`) + "\x1b[0m" + (`]`) + "\x1b[31m" +` Zbyt duza ilosc komend ma taka sama nazwe: ${pull.info.name}!`);

                    client.commands.set(pull.info.name, pull);
                    console.log("\x1b[0m" + (`[`) + "\x1b[36m%s", (`Handler`) + "\x1b[0m" + (`]`) + ` Komenda ${pull.info.name} zostala pomyslnie zaladowana!`);

                } else {
                    console.warn("\x1b[0m" + (`[`) + "\x1b[33m" + (`Warn`) + "\x1b[0m" + (`]`) + "\x1b[33m" + ` Wystapil blad podczas ladowania komendy (sciezka: ${drc}/${file})!`);
                    continue;
                }
                
                if (pull.info.aliases && pull.info.aliases.forEach(als => {
                    if (client.aliases.get(als)) return console.warn("\x1b[0m" + (`[`) + "\x1b[31m" + (`Error`) + "\x1b[0m" + (`]`) + "\x1b[31m" + ` Dwie lub wiecej komend posiadaja takie same aliasy: ${als}!`);

                    client.aliases.set(als, pull.info.name);
                })
                );
            };
        });
    };

    commandload();
};