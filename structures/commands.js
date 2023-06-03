'use strict';

const { readdirSync } = require('fs');

module.exports = (client) => {
  const commands = readdirSync('./commands', { withFileTypes: true })
    .filter((directory) => directory.isDirectory())
    .map((directory) => directory.name);

  for (const directory of commands) {
    const commandFiles = readdirSync(`./commands/${directory}`)
      .filter((file) => file.endsWith('.js'));

    for (const file of commandFiles) {
      const command = require(`../commands/${directory}/${file}`);

      // Sprawdzenie czy komenda poprawnie sie laduje
      if (typeof command.run !== 'function') {
        console.warn(`\x1b[0m[${"\x1b[33m"}Warn${"\x1b[0m"}] \x1b[33mBlad podczas ladowania komendy ${directory}/${file}!`);
        continue;
      }

      // Sprawdzenie czy komenda nie ma takiej samej nazwy jak pozostale
      if (client.commands.has(command.info.name)) {
        console.error(`\x1b[0m[${"\x1b[31m"}Error${"\x1b[0m"}] \x1b[31mZbyt duza ilosc komend ma taka sama nazwe: ${command.info.name}!`);
        continue;
      }

      // Zaladowanie komend
      client.commands.set(command.info.name, command);
      console.log(`\x1b[0m[${"\x1b[36m"}Handler${"\x1b[0m"}] Komenda ${command.info.name} zostala pomyslnie zaladowana!`);

      // Sprawdzenie czy komenda nie ma takich samych aliasow jak pozotale
      if (command.info.aliases && Array.isArray(command.info.aliases)) {
        command.info.aliases.forEach((alias) => {
          if (client.aliases.has(alias)) {
            console.error(`[${"\x1b[31m"}Error${"\x1b[0m"}] \x1b[31mDwie lub wiecej komend posiada takie same aliasy: ${alias}!`);
          } else {
            client.aliases.set(alias, command.info.name);
          }
        });
      }

      // Sprawdzenie czy komenda jest tylko dla wlascicieli
      if (command.info.owner === true) {
        command.ownerOnly = true;
      }
    }
  }
};