'use strict';

const { ClusterManager } = require('discord-hybrid-sharding');

const manager = new ClusterManager('./index.js', {
    totalShards: 'auto',
    mode: 'process',
    shardsPerClusters: 8,
    token: process.env.TOKEN
});

manager.on('clusterCreate', cluster => console.log(`[\x1b[36mShard\x1b[0m] Uruchomiono shard ${cluster.id}`));
manager.spawn({timeout: -1});
