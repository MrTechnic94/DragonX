'use strict';

const fs = require('fs/promises');
const path = require('path');

module.exports = async (client) => {
  const directory = await fs.readdir('./events/', {withFileTypes: true});

  for (const eventDir of directory) {
    eventDir.isDirectory() &&
      await Promise.all(
        (await fs.readdir(path.join('./events/', eventDir.name)))
          .filter((file) => file.endsWith('.js'))
          .map(async (file) => {
            const event = require(path.join(__dirname, '..', 'events', eventDir.name, file));
            const eventName = file.slice(0, -3);

            console.log(`[${"\x1b[36m"}Handler${"\x1b[0m"}] Zaladowano wydarzenie ${file}`);

            if (event.once) {
              client.once(eventName, (...args) => event.run(client, ...args));
            } else {
              client.on(eventName, (...args) => event.run(client, ...args));
            }
          })
      );
  }
};