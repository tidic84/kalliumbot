const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red } = require('./colors.json')

module.exports = {
    name: 'avatar-gif',
    description: 'Afficher avatar',
    aliases: [ 'pp-gif' , 'ppg', "pp-g", 'avatarg'],
    
    execute(client, message) {
        if (!message.mentions.users.size) {
            const embed = new MessageEmbed()
                .setTitle(`${message.author.username}`)
                .setColor(`${blue}`)
                .setImage(`${message.author.displayAvatarURL({ format : 'gif'})}`)
            message.channel.send(embed);
        
        }

        const avatarList = message.mentions.users.map(user => {
            const embed = new MessageEmbed()
                .setTitle(`${user.username}`)
                .setColor(`${blue}`)
                .setImage(`${user.displayAvatarURL({ format : 'gif'})}`)
            message.channel.send(embed);

        });

    }
};