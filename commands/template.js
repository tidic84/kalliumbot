const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red } = require('../colors.json')

module.exports = {
    name: 'template',
    description: 'template',
    
    async execute(client, message, settings, args) { 

        const embed = new MessageEmbed()
            .setTitle('Pong !')
            .setColor(`${blue}`)
        message.channel.send(embed);
    }
};
