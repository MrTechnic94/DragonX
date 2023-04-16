'use strict';

exports.run = async (_client, queue) => {

    // if (queue.npmessage?.editable) queue.npmessage.delete().catch(() => {});
    if (queue.npmessage?.editable) queue.npmessage.delete();
};