'use strict';

const path = require('node:path');
const { readdirSync } = require('node:fs');
const { logger } = require('../utils/consoleLogger.js');

module.exports = (client) => {
  readdirSync(`./events/`).forEach((directory) => {
    const eventFiles = readdirSync(path.join(`./events/`, directory)).filter((file) => file.endsWith('.js'));

    for (const file of eventFiles) {
      const eventName = file.slice(0, file.lastIndexOf('.'));
      const event = require(path.join(__dirname, '..', `./events/`, directory, file));
      logger.info(`Zaladowano wydarzenie ${eventName}!`);

      // Sprawdzenie czy parametr once jest ustawiony
      client[event.once ? 'once' : 'on'](eventName, (...args) => event.run(client, ...args));
    }
  });
};