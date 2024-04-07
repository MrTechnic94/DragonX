'use strict';

module.exports = {
    name: 'emptyChannel',
    run: async (_client, queue) => {
        if (queue.npmessage?.editable) await queue.npmessage.delete().catch(() => { });
    }
};