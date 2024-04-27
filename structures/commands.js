'use strict';

const logger = require('../utils/consoleLogger.js');
const { readdirSync } = require('node:fs');

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
      if (typeof command.run !== 'function') return logger.error(`Blad podczas ladowania polecenia: ${directory}/${file}!`);

      // Sprawdzenie czy komenda nie ma takiej samej nazwy jak pozostale
      if (client.commands.has(command.name)) return logger.warn(`Zbyt wiele polecen posiada taka sama nazwe: ${command.name}!`);

      // Zaladowanie komend
      client.commands.set(command.name, command);
      logger.info(`Polecenie ${command.name} zostalo zaladowane!`);

      // Sprawdzenie czy komenda nie ma takich samych aliasow jak pozotale
      if (command.aliases && Array.isArray(command.aliases)) {
        command.aliases.forEach((alias) => {
          if (client.aliases.has(alias)) {
            logger.warn(`Zbyt wiele polecen posiada takie same aliasy: ${alias}!`);
          } else {
            client.aliases.set(alias, command.name);
          }
        });
      };

      // Sprawdzenie czy komenda jest tylko dla wlasciciela
      if (command.owner === true) command.ownerOnly = true;
    }
  }
};