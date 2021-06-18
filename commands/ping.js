const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red } = require('./colors.json')

module.exports = {
    name: 'ping',
    description: 'test bot',
    
    execute(client, message) {
        const embed = new MessageEmbed()
            .setTitle('Pong !')
            .setColor(`${blue}`)
        message.channel.send(embed);
    }
};