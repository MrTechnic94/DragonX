'use strict';

module.exports = {
    name: 'playerFinish',
    run: async (_client, queue) => {
        if (queue.npmessage?.editable) await queue.npmessage.delete().catch(() => { });
    }
};