'use strict';

const Redis = require('ioredis');

const redis = new Redis({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD
});

module.exports = {
  setGuildSettings: async (guildId, prefix, djRoleId) => {
    return await redis.hmset(guildId, 'prefix', prefix, 'djRoleId', djRoleId);
  },

  getGuildSettings: async (guildId) => {
    return await redis.hgetall(guildId);
  },

  removeGuildSettings: async (guildId) => {
    return await redis.del(guildId);
  }
};