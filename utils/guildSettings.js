'use strict';

const Redis = require('ioredis');

// Polaczenie sie z baza redis
const redis = new Redis({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD
});

module.exports = {
  // Utworzenie funkcji odpowiadajacej za ustawienie parametrow dla guildi
  async setGuildSettings(guildId, prefix, djRoleId) {
    return await redis.hmset(guildId, 'prefix', prefix, 'djRoleId', djRoleId);
  },

  // Utworzenie funkcji odpowiadajacej za pobranie ustawien guildi
  async getGuildSettings(guildId) {
    return await redis.hgetall(guildId);
  },

  // Utworzenie funkcji odpowiadajacej za usuwanie parametrow z guildi
  async removeGuildSettings(guildId) {
    return await redis.del(guildId);
  }
};
