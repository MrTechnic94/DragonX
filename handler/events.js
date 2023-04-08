'use strict';

const fs = require('fs');
const path = require('path');

module.exports = (client) => {

    fs.readdirSync(`./events/`).forEach((directory) => {
      const eventFiles = fs.readdirSync(path.join(`./events/`, directory)).filter((file) => file.endsWith('.js'));
  
      for (const file of eventFiles) {
        const event = require(path.join(__dirname, '..', `./events/`, directory, file));
        console.log(`[${"\x1b[36m"}Handler${"\x1b[0m"}] Zaladowano wydarzenie ${file}`);
        client.on(file.split('.')[0], (...args) => event.run(client, ...args));
      }
    });
  };
