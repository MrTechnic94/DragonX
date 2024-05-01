'use strict';

const logger = require('../utils/consoleLogger.js');
const path = require('node:path');
const { readdirSync } = require('node:fs');
const { useMainPlayer } = require('discord-player');

module.exports = (client) => {
  readdirSync(`./events/`).forEach((directory) => {
    const eventFiles = readdirSync(path.join(`./events/`, directory)).filter((file) => file.endsWith('.js'));

    for (const file of eventFiles) {
      const eventName = file.slice(0, file.lastIndexOf('.'));
      const event = require(path.join(__dirname, '..', `./events/`, directory, file));
      logger.info(`Wydarzenie ${eventName} zostalo zaladowane`);

      const eventHandler = (...args) => event.run(client, ...args);

      if (directory === 'player') {
        const player = useMainPlayer();
        player.events.on(eventName, eventHandler);
      } else if (directory === 'process') {
        process.on(eventName, eventHandler);
      } else {
        client[(event.once ? 'once' : 'on')](eventName, eventHandler);
      }
    }
  })
};