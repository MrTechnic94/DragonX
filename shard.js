const Cluster = require('discord-hybrid-sharding');
require('dotenv').config();

const manager = new Cluster.Manager('./index.js', {
    totalShards: 'auto',
    shardsPerClusters: 2,
    mode: 'process',
    token: process.env.TOKEN
});

manager.on('clusterCreate', cluster => console.log(`Zaladowano cluster ${cluster.id}`))
manager.spawn({ timeout: -1 })
