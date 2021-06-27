const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red } = require('../colors.json')

module.exports = {
    name: 'giveaway',
    aliases: ["g","giveways"],
    description: 'template',
    
    async execute(client, message, settings, args) { 
// Schéma de commande /giveaway <channel> <timestamp> <le lot>

        if(args[0] == null) {
            const embed = new MessageEmbed().setTitle("Erreur").setDescription(`Définit un channel`).setColor(`${red}`)
            message.channel.send(embed);
        }

        let channel ="";
        channel = args[0].toString().replace("<", "").replace(">", "").replace("#", "");
        try {
            channel = client.channels.cache.get(channel)
        } catch (error) {
            const embed = new MessageEmbed().setTitle("Erreur").setDescription(`'${args[0]}' n'est pas un salon valide`).setColor(`${red}`)
            message.channel.send(embed);
        };

        if(args[1] == null) {
            const embed = new MessageEmbed().setTitle("Erreur").setDescription(`Définit un temps`).setColor(`${red}`)
            message.channel.send(embed);
        }
        if(isNaN(args[1])) {
            const embed = new MessageEmbed().setTitle("Erreur").setDescription(`${args[1]} n'est pas un nombe valide`).setColor(`${red}`)
            message.channel.send(embed);
        }
        temps = args[1]


        const embed = new MessageEmbed()
            .setTitle('Pong !')
            .setColor(`<t:${temps}>:R`)
        message.channel.send(embed);
    }
};
