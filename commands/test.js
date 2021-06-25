const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red } = require('../colors.json')

module.exports = {
    name: 'test',
    cooldown: 5,
    description: 'template',
    
    async execute(client, message, settings, args) { 
        const emoji = client.emojis.cache.get("857979405729136650")
        message.channel.send(`Emoji: ${emoji}`);

        // const embed = new MessageEmbed()
        //     .setTitle('Pong !')
        //     .setColor(`${blue}`)
        // message.channel.send(embed);
    }
};
