const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red } = require('../colors.json')

module.exports = {
    name: 'embed',
    description: 'template',
    
    execute(client, message) {
        const embed = new MessageEmbed()
            .setTitle('Heyy !!')
            .setDescription(`Bienvenue **{{USER}}** !
            Amuse toi bien sur **{{SERVER_NAME}}** :tada: `)
            .setImage(message.author.displayAvatarURL({ dynamic : true}))
            .setColor(`${blue}`)
        message.channel.send(embed);
    }
};