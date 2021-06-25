const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red } = require('../colors.json')

module.exports = {
    name: 'embed',
    description: 'embed',
    
    execute(client, message, settings, args, cmd) {
        let channel ="";
        channel = args[0]
        channel = channel.toString()
        .replace("<", "")
        .replace(">", "")
        .replace("#", "");
        try {
            channel = client.channels.cache.get(channel)
        } catch (error) {
            const embed = new MessageEmbed()
                .setTitle("Erreur")
                .setDescription(`'${args[0]}' n'est pas un salon valide`)
                .setColor(`${red}`)
            message.channel.send(embed);
        };
        const msg = message.content.slice(settings.prefix.length + cmd.length + args[0].length + args[1].length + 3);
        
        const title = args[1].replace("/_", " ").replace("/_", " ").replace("/_", " ").replace("/_", " ").replace("/_", " ").replace("/_", " ")
        

        const embed = new MessageEmbed()
            .setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic : true }))
            .setTitle(title)
            .setDescription(`${msg}`)
            .setColor(`${blue}`)
        channel.send(embed);
    }
};