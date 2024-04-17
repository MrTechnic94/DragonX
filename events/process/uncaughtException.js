'use strict';

const logger = require('../../utils/consoleLogger.js');

module.exports = {
    name: 'uncaughtException',
    run: async (_client, err) => {
        return logger.error(err);
    }
};