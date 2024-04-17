'use strict';

const logger = require('../../utils/consoleLogger.js');

module.exports = {
    name: 'unhandledRejection',
    run: async (_client, reason) => {
        return logger.error(reason);
    }
};