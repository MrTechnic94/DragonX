'use strict';

const { readdirSync } = require('node:fs');
const { logger } = require('../utils/consoleLogs.js');

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
        logger.warn(`Blad podczas ladowania polecenia: ${directory}/${file}!`);
        continue;
      }

      // Sprawdzenie czy komenda nie ma takiej samej nazwy jak pozostale
      if (client.commands.has(command.info.name)) {
        logger.error(`Zbyt wiele polecen posiada taka sama nazwe: ${command.info.name}!`);
        continue;
      }

      // Zaladowanie komend
      client.commands.set(command.info.name, command);
      logger.info(`Polecenie ${command.info.name} zostalo zaladowane!`);

      // Sprawdzenie czy komenda nie ma takich samych aliasow jak pozotale
      if (command.info.aliases && Array.isArray(command.info.aliases)) {
        command.info.aliases.forEach((alias) => {
          if (client.aliases.has(alias)) {
            logger.error(`Zbyt wiele polecen posiada takie same aliasy: ${alias}!`);
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