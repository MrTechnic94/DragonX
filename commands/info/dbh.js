const Discord = require("discord.js");
 
var DanBotHosting = require("danbot-hosting");
 
exports.run = async (client, message) => {

  const API = new DanBotHosting.Client("danbot-J9QSQPhsOpqpV5c@b%DjuSe6PyZbzOpDKA28wwhO", client);
 
  let initalPost = await API.autopost();
 
  if (initalPost) {
    console.error(initalPost);
    
    }
};

exports.info = {
    name: "dbh"
}