'use strict';

const { Schema, model } = require('mongoose');

// Stworzenie schematu odpowiedzialnego za przechowywanie id guildi, prefixu oraz id roli dj
const guildSettingsSchema = new Schema({
  guildId: {
    type: String,
    unique: true,
    required: true
  },
  prefix: {
    type: String,
    default: process.env.PREFIX
  },
  djRoleId: {
    type: String,
    default: null
  }
});

module.exports = model('guildSettings', guildSettingsSchema);