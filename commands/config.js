const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red } = require('./colors.json')

module.exports = {
    name: 'config',
    description: 'config',
    
    execute(client, message, settings) {
        const embed = new MessageEmbed()
            .setTitle(`Prefix actuel: \`${settings.prefix}\``)
            .setColor(`${blue}`)
        message.channel.send(embed);
    }
};