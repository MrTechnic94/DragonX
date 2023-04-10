module.exports = client => {
    
    const { readdirSync } = require('fs');
    const { sep } = require('path');

    const commandload = () => {

        readdirSync('./commands/').forEach(drc => {

            const commands = readdirSync(`./commands/${sep}${drc}${sep}`);

            for(const file of commands) {
                const pull = require(`../commands/${drc}/${file}`);

                if (pull.info && typeof pull.info.name === "string") {

                    if(client.commands.get(pull.info.name)) return console.warn(`[Handlers] Zbyt duza ilosc komend ma taka sama nazwe! (${pull.info.name})`);

                    client.commands.set(pull.info.name, pull);
                    console.log(`[Commands] Komenda ${pull.info.name} zostala pomyslnie zaladowana!`);

                } else {
                    console.warn(`[Handler] Wystąpił błąd podczas ładowania komendy (sieżka: ${drc}/${file})!`);
                    continue;
                }
                
                if (pull.info.aliases && pull.info.aliases.forEach(als => {
                    if(client.aliases.get(als)) return console.warn(`[Handler] Dwie bądź więcej komend posiadają takie same aliasy: ${als}!`);

                    client.aliases.set(als, pull.info.name);
                    
                })
                );
            };
        });
    };

    commandload();
};