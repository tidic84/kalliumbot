const { MessageEmbed } = require('discord.js');
var path = require('path');
var appDir = path.dirname(require.main.filename);
const { blue, green, yellow, red } = require('./colors.json')

module.exports = {
    name: 'template',
    description: 'template',
    
    execute(client, message) {
        const embed = new MessageEmbed()
            .setTitle('Pong !')
            .setColor(`${blue}`)
        message.channel.send(embed);
    }
};