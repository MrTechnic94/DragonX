'use strict';

const redis = require('./redis.js');

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