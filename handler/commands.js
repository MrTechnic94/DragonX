'use strict';

module.exports = client => {
    
    const { readdirSync } = require('fs');
    const { sep } = require('path');
    const clc = require('cli-color');
    
    const commandload = () => {

        readdirSync('./commands/').forEach(drc => {

            const commands = readdirSync(`./commands/${sep}${drc}${sep}`);

            for(const file of commands) {
                const pull = require(`../commands/${drc}/${file}`);

                if (pull.info && typeof pull.info.name === "string") {

                    if(client.commands.get(pull.info.name)) return console.warn((`[`) + clc.redBright(`Error`) + (`]`) + ` Zbyt duza ilosc komend ma taka sama nazwe! (${pull.info.name})`);

                    client.commands.set(pull.info.name, pull);
                    console.log((`[`) + clc.cyan(`Komendy`) + (`]`) + ` Komenda ${pull.info.name} zostala pomyslnie zaladowana!`);

                } else {
                    console.warn((`[`) + clc.cyan(`Komendy`) + (`]`) + ` Wystapil blad podczas ladowania komendy (siezka: ${drc}/${file})!`);
                    continue;
                }
                
                if (pull.info.aliases && pull.info.aliases.forEach(als => {
                    if(client.aliases.get(als)) return console.warn((`[`) + clc.redBright(`Error`) + (`]`) + ` Dwie bądź więcej komend posiadają takie same aliasy: ${als}!`);

                    client.aliases.set(als, pull.info.name);
                    
                })
                );
            };
        });
    };

    commandload();
};