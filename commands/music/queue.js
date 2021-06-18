const { MessageEmbed } = require('discord.js');
var path = require('path');
var appDir = path.dirname(require.main.filename);

const { blue, green, yellow, red } = require(`${appDir}/commands/colors.json`)

var list = [];

module.exports = {
    name: 'queue',
    description: 'Affiche la file d\'attente.',
    
    execute(message, args) {
        
    }
};