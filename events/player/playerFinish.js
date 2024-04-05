'use strict';

module.exports = {
    name: 'playerFinish',
    run: async (_client, queue) => {
        if (queue.npmessage && queue.npmessage.editable) queue.npmessage.delete().catch(() => { });
    }
};