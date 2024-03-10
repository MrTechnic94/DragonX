'use strict';

const { readdirSync } = require('node:fs');
const { useMainPlayer } = require('discord-player');
const { logger } = require('../utils/consoleLogger.js');

module.exports = (client) => {
  const player = useMainPlayer();
  const events = readdirSync(`./events-music/`).filter((file) => file.endsWith('.js'));

  for (const file of events) {
    const eventName = file.slice(0, file.lastIndexOf('.'));
    const event = require(`../events-music/${file}`);
    logger.info(`Zaladowano wydarzenie ${eventName}!`);
    player.events.on(eventName, (...args) => event.run(client, ...args));
  }
};