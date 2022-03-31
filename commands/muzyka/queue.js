const {MessageEmbed} = require('discord.js');
const { Player } = require('discord-player');

exports.run = async (client, message) => {

    const queue = client.player.getQueue(message.guild.id);

    if(!queue || !queue.playing) return message.reply({embeds:[new MessageEmbed().setDescription(`❌ **Nie ma żadnych piosenek w kolejce!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("RED")]});

    let st = "";
    let i = 0

    queue.tracks.forEach(track => {
        i++;
        st += `• **${i}** - ${track.title}\n`
        
    })

    String.prototype.trimEllip = function (length) {
        return this.length > length ? this.substring(0, length) + "..." : this;
      }

    return message.reply({embeds: [new MessageEmbed().setTitle("📰 Piosenki w kolejce").setDescription(`${st.trimEllip(4090).toString()}`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("6b3deb")]})

};

exports.info = {
    name: "queue"
}