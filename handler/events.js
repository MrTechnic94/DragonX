'use strict';

const fs = require('fs');
const path = require('path');

module.exports = (client) => {

    const eventDir = './events/';

    fs.readdirSync(eventDir).forEach((directory) => {
      const eventFiles = fs.readdirSync(path.join(eventDir, directory)).filter((file) => file.endsWith('.js'));
  
      for (const file of eventFiles) {
        const event = require(path.join(__dirname, '..', eventDir, directory, file));
        console.log(`[${"\x1b[36m"}Handler${"\x1b[0m"}] Zaladowano wydarzenie ${file}`);
        client.on(file.split('.')[0], (...args) => event.run(client, ...args));
      }
    });
  };
