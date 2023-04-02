'use strict';

const { readdirSync } = require('fs');

module.exports = (client) => {

  const eventsDir = './events-music/';

  const events = readdirSync(eventsDir).filter((file) => file.endsWith('.js'));

  for (const file of events) {
    const event = require(`../${eventsDir}${file}`);
    console.log(`[${"\x1b[36m"}Handler${"\x1b[0m"}] Zaladowano wydarzenie ${file}`);
    client.player.events.on(file.split('.')[0], (...args) => event.run(client, ...args));
  }

};
