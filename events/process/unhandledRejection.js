'use strict';

const logger = require('../../utils/consoleLogger.js');

module.exports = {
    name: 'unhandledRejection',
    async run(_client, reason) {
        return logger.error(reason);
    }
};