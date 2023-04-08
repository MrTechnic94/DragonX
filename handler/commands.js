'use strict';

const { readdirSync } = require('fs');
const { sep } = require('path');

module.exports = (client) => {

  readdirSync(`./commands/`).forEach((directory) => {
    const commandFiles = readdirSync(`./commands/${sep}${directory}${sep}`).filter((file) => file.endsWith('.js'));

    for (const file of commandFiles) {
      const command = require(`../commands/${directory}/${file}`);

      if (command.run && typeof command.run === 'function') {
        if (client.commands.get(command.info.name)) {
          console.warn(`[${"\x1b[31m"}Error${"\x1b[0m"}] \x1b[31mZbyt duza ilosc komend ma taką samą nazwe: ${command.info.name}!`);
          continue;
        }

        client.commands.set(command.info.name, command);
        console.log(`[${"\x1b[36m"}Handler${"\x1b[0m"}] Komenda ${command.info.name} zostala pomyslnie zaladowana!`);
      } else {
        console.warn(`[[${"\x1b[33m"}Warn${"\x1b[0m"}] \x1b[33mBlad podczas ladowania komendy ${directory}/${file}!`);
        continue;
      }

      if (command.info.aliases && Array.isArray(command.info.aliases)) {
        command.info.aliases.forEach((alias) => {
          if (client.aliases.get(alias)) {
            console.error(`[${"\x1b[31m"}Error${"\x1b[0m"}] \x1b[31mDwie lub wiecej komend posiada takie same aliasy: ${alias}!`);
          } else {
            client.aliases.set(alias, command.info.name);
          }
        });
      }
    }
  });

};
