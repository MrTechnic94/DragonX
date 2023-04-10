'use strict';

const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

exports.run = async (_client, queue, track) => {

    const request = track.requestedBy ?? `brak`;

    const embed = new EmbedBuilder()
        .setTitle("▶️ Aktualnie Odtwarzam")
        .setDescription(`[${track.title}](${track.url})`)
        .addFields(
            { name: '**Na prośbę:**', value: `${request}`, inline: true },
            { name: '**Czas trwania:**', value: `\`\`${track.duration}\`\``, inline: true }
        )
        .setThumbnail(track.thumbnail)
        .setColor("Blue");

    return queue.metadata.channel.send({embeds: [embed]}).then((msg) => {
        queue.npmessage = msg;
    });
    // const skipButton = new ButtonBuilder()
    //     .setCustomId('skip')
    //     .setLabel('Skip')
    //     .setStyle(ButtonStyle.Secondary);

    // const pauseButton = new ButtonBuilder()
    //     .setCustomId('pause')
    //     .setLabel('Pause')
    //     .setStyle(ButtonStyle.Secondary);

    // const resumeButton = new ButtonBuilder()
    //     .setCustomId('resume')
    //     .setLabel('Resume')
    //     .setStyle(ButtonStyle.Primary);

    // const leaveButton = new ButtonBuilder()
    //     .setCustomId('leave')
    //     .setLabel('Leave')
    //     .setStyle(ButtonStyle.Danger);

    // const row = new ActionRowBuilder()
    //     .addComponents([skipButton, pauseButton, resumeButton, leaveButton]);

    // const filter = (interaction) => interaction.isButton();

    // const collector = message.createMessageComponentCollector({ filter, time: 6000 });

    // collector.on('collect', async (interaction) => {
    //     switch (interaction.customId) {
    //         case 'skip':
    //         if (!queue.tracks.at(0)) return interaction.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie ma żadnych piosenek w kolejce!**`).setColor("Red")], ephemeral: true});
    //         await queue.node.skip();
    //         interaction.reply({embeds: [new EmbedBuilder().setTitle(`⏩ Pominąłeś aktualną piosenkę!`).setDescription(`**Pominąłeś:** \`\`${queue.currentTrack.title}\`\` `).setColor("6b3deb")], ephemeral: true});
    //         break;

    //     case 'pause':
    //         if (queue.node.isPaused()) return interaction.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Piosenka jest już zatrzymana!**`).setColor("Red")], ephemeral: true});
    //         await queue.node.pause();
    //         interaction.reply({embeds: [new EmbedBuilder().setTitle(`🔇 Zatrzymałeś odtwarzanie piosenki!`).setDescription(`**Zatrzymałeś odtwarzanie piosenki:** \`\`${queue.currentTrack.title}\`\` `).setColor("6b3deb")], ephemeral: true});
    //         break;

    //     case 'resume':
    //         if (!queue.node.isPaused()) return interaction.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Piosenka nie jest zatrzymana!**`).setColor("Red")], ephemeral: true});
    //         await queue.node.resume();
    //         interaction.reply({embeds: [new EmbedBuilder().setTitle(`🔊 Wznowiłeś odtwarzanie piosenki`).setDescription(`**Wznowiłeś odtwarzanie piosenki** \`\`${queue.currentTrack.title}\`\` `).setColor("6b3deb")], ephemeral: true});
    //         break;

    //     case 'leave':
    //         await queue.delete();
    //         interaction.reply({embeds: [new EmbedBuilder().setDescription("🔮 **Wychodzę z kanału!**").setColor("Gold")], ephemeral: true});
    //         break;
    //     };

    //     collector.on('end', async (collected, reason) => {
    //         embed.delete();
    //         if (reason == 'time') {
    //             console.log('czas')
    //         } else if (reason == 'messageDelete') {
    //             console.log('usuniete')
    //         } else if (reason == 'update') {
    //             console.log('nie aktualne')
    //         } else {
    //           // nieznany powód błędu
    //           // możesz wyświetlić ogólną informację o problemie
    //         }
    //       });

};