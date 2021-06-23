const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red } = require('../colors.json')

module.exports = {
    name: 'add-money',
    description: 'Ajoute de la money',
    
    async execute(client, message, settings, args, cmd, profileData) { 
        var total = "";
// ADD WALLET

        if(args[2] == "bank") {
            total = parseInt(profileData.bank) + parseInt(args[1]);
            if(!message.mentions.users.size){
                const embed = new MessageEmbed()
                    .setTitle('Erreur')
                    .setDescription(` Veuillez mentionner un membre`)
                    .setColor(`${red}`)
                return message.channel.send(embed);
            }
            if(isNaN(total)){
                const embed = new MessageEmbed()
                    .setTitle('Erreur')
                    .setDescription(` **'${args[1]}'** n'est pas un nombre valide`)
                    .setColor(`${red}`)
                return message.channel.send(embed);
            }
            client.updateProfile(message.mentions.users.first(), { bank: total}, message.member.guild.id )
    
            const embed = new MessageEmbed()
                .setTitle('Ajout réussi')
                .setDescription(` $${args[1]} on été ajouté au compte banquaire de ${message.mentions.users.first().username}.`)
                .setColor(`${green}`)
            message.channel.send(embed);

// ADD BANK

        } else {
            total = parseInt(profileData.coins) + parseInt(args[1]);
            if(!message.mentions.users.size){
            const embed = new MessageEmbed()
                    .setTitle('Erreur')
                    .setDescription(` Veuillez mentionner un membre`)
                    .setColor(`${red}`)
                return message.channel.send(embed);
            }
            if(isNaN(total)){
                const embed = new MessageEmbed()
                    .setTitle('Erreur')
                    .setDescription(` **'${args[1]}'** n'est pas un nombre valide`)
                    .setColor(`${red}`)
                return message.channel.send(embed);
            }
            client.updateProfile(message.mentions.users.first(), { coins: total}, message.member.guild.id )
    
            const embed = new MessageEmbed()
                .setTitle('Ajout réussi')
                .setDescription(` $${args[1]} on été ajouté au porte feuille de ${message.mentions.users.first().username}.`)
                .setColor(`${green}`)
            message.channel.send(embed);
        }
    }
};
