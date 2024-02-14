'use strict';

const { readdirSync } = require('node:fs');
const { logger } = require('../utils/consoleLogs.js');

module.exports = (client) => {
  const events = readdirSync(`./events-music/`).filter((file) => file.endsWith('.js'));

  for (const file of events) {
    const eventName = file.slice(0, file.lastIndexOf('.'));
    const event = require(`../events-music/${file}`);
    logger.info(`Zaladowano wydarzenie ${eventName}!`);
    client.player.events.on(eventName, (...args) => event.run(client, ...args));
  }
};