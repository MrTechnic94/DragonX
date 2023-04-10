const { ShardingManager } = require('discord.js');
const clc = require('cli-color');
require('dotenv').config();

let manager = new ShardingManager('./index.js', {
    totalShards: 'auto',
    shardList: 'auto',
    token: process.env.TOKEN
});

manager.on('shardCreate', shard => {
    manager.once("ready", () => {
        shard.send({type: "shardId", data: {shardId: shard.id}});
    console.log((`[`) + clc.cyan(`Shardy`) + (`]`) + ` Uruchomiono shard ${shard.id}`)
    })
});

manager.spawn();