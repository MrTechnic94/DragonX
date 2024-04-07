'use strict';

module.exports = {
    name: 'disconnect',
    run: async (_client, queue) => {
        if (queue.npmessage?.editable) await queue.npmessage.delete().catch(() => { });
    }
};