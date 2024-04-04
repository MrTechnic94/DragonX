'use strict';

const path = require('node:path');
const logger = require('../utils/consoleLogger.js');
const { readdirSync } = require('node:fs');
const { useMainPlayer } = require('discord-player');

module.exports = (client) => {
  readdirSync(`./events/`).forEach((directory) => {
    const eventFiles = readdirSync(path.join(`./events/`, directory)).filter((file) => file.endsWith('.js'));

    for (const file of eventFiles) {
      const eventName = file.slice(0, file.lastIndexOf('.'));
      const event = require(path.join(__dirname, '..', `./events/`, directory, file));
      logger.info(`Zaladowano wydarzenie ${eventName}!`);

      const eventHandler = (...args) => event.run(client, ...args);

      if (directory === 'player') {
        const player = useMainPlayer();
        player.events.on(eventName, eventHandler);
      } else if (event.once) {
        client.once(eventName, eventHandler);
      } else {
        client.on(eventName, eventHandler);
      }
    }
  });
};