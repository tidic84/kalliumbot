const { MessageEmbed } = require('discord.js');
var path = require('path');
var appDir = path.dirname(require.main.filename);
const { blue, green, yellow, red } = require('./colors.json')

module.exports = {
    name: 'template',
    description: 'template',
    
    execute(client, message) {
        message.channel.send('template')
    }
};