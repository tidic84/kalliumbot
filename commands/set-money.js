const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red } = require('../colors.json')

module.exports = {
    name: 'set-money',
    description: 'Ajoute de la money',
    
    async execute(client, message, settings, args, cmd, profileData) { 
        var total = "";

        if(message.mentions.users.first().bot){
            const embed = new MessageEmbed()
                .setTitle('Erreur')
                .setDescription(` **${args[0]}** est un bot`)
                .setColor(`${red}`)
            return message.channel.send(embed);
        }
        
// SI BANK

        if(args[2] == "bank") {
        if(!message.mentions.users.size){
            const embed = new MessageEmbed()
                .setTitle('Erreur')
                .setDescription(` Veuillez mentionner un membre`)
                .setColor(`${red}`)
            return message.channel.send(embed);
        }
        if(isNaN(args[1])){
            const embed = new MessageEmbed()
                .setTitle('Erreur')
                .setDescription(` **'${args[1]}'** n'est pas un nombre valide`)
                .setColor(`${red}`)
            return message.channel.send(embed);
        }

        client.updateProfile(message.mentions.users.first(), { bank: args[1]}, message.member.guild.id)

        const embed = new MessageEmbed()
            .setTitle('Ajout réussi')
            .setDescription(` ${message.mentions.users.first().username} a désormais ${settings.currency} ${args[1]} dans son compte banquaire`)
            .setColor(`${green}`)
        message.channel.send(embed);

// SI AUTRE QUE BANK

        } else {

        if(!message.mentions.users.size){
            const embed = new MessageEmbed()
                .setTitle('Erreur')
                .setDescription(` Veuillez mentionner un membre`)
                .setColor(`${red}`)
            return message.channel.send(embed);
        }
        if(isNaN(args[1])){
            const embed = new MessageEmbed()
                .setTitle('Erreur')
                .setDescription(` **'${args[1]}'** n'est pas un nombre valide`)
                .setColor(`${red}`)
            return message.channel.send(embed);
        }

        client.updateProfile(message.mentions.users.first(), { coins: args[1]}, message.member.guild.id)

        const embed = new MessageEmbed()
            .setTitle('Ajout réussi')
            .setDescription(` ${message.mentions.users.first().username} a désormais ${settings.currency} ${args[1]} dans son porte feuille.`)
            .setColor(`${green}`)
        message.channel.send(embed);
        }
    }
};
