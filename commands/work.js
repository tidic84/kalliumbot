const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red } = require('../colors.json')

module.exports = {
    name: 'work',
    cooldown: 3600,
    description: 'work for money',
    aliases: ["bed", "wk"],
    
    async execute(client, message, settings, args, cmd, profileData) { 
        
        const randomNumber = Math.floor(Math.random() * 50) + 1;

        total = parseInt(profileData.coins) + parseInt(randomNumber);

        client.updateProfile(message.member, { coins: total }, message.guild.id)

        const embed = new MessageEmbed()
            .setDescription(`Tu as travaillé et tu as gagné ${randomNumber}`)
            .setColor(`${blue}`)
            .setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic : true }))
        message.channel.send({embed: embed});
    }
};
