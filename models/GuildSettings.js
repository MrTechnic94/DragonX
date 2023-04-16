const { Schema, model } = require('mongoose');

const guildSettingsSchema = new Schema({
  guildId: {
    type: String,
    unique: true,
    required: true,
    index: true,
  },
  prefix: {
    type: String,
    default: process.env.PREFIX,
  },
  djRoleId: { 
    type: String, 
    default: null,
    index: true
  }
});

module.exports = model('GuildSettings', guildSettingsSchema);