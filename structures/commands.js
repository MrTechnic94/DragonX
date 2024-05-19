'use strict';

const logger = require('../utils/consoleLogger');
const path = require('node:path');
const { readdirSync } = require('node:fs');

module.exports = (client) => {
  const commandsDir = path.join(__dirname, '../commands');

  readdirSync(commandsDir, { withFileTypes: true }).forEach((directory) => {
    if (!directory.isDirectory()) return;

    const commandFiles = readdirSync(path.join(commandsDir, directory.name))
      .filter((file) => file.endsWith('.js'));

    for (const file of commandFiles) {
      const command = require(path.join(commandsDir, directory.name, file));

      // Sprawdzenie czy komenda poprawnie sie laduje
      if (typeof command.run !== 'function') {
        logger.error(`Blad podczas ladowania polecenia: ${directory.name}/${file}`);
        continue;
      }

      // Sprawdzenie czy komenda nie ma takiej samej nazwy jak pozostale
      if (client.commands.has(command.name)) {
        logger.warn(`Zbyt wiele polecen posiada taka sama nazwe: ${command.name}`);
        continue;
      }

      // Zaladowanie komend
      client.commands.set(command.name, command);
      logger.info(`Polecenie ${command.name} zostalo zaladowane`);

      // Sprawdzenie czy komenda nie ma takich samych aliasow jak pozotale
      if (command.aliases && Array.isArray(command.aliases)) {
        command.aliases.forEach((alias) => {
          if (client.aliases.has(alias)) {
            logger.warn(`Zbyt wiele polecen posiada takie same aliasy: ${alias}`);
          } else {
            client.aliases.set(alias, command.name);
          }
        });
      }

      // Sprawdzenie czy komenda jest tylko dla wlasciciela
      if (command.owner === true) command.ownerOnly = true;
    }
  });
};