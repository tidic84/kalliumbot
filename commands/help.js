const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red } = require('./colors.json')

module.exports = {
    name: 'help',
    description: 'Affiche la liste des commandes',
    
    execute(client, message) {
        const embed = new MessageEmbed()
            .setTitle('Liste des commandes')
            .setColor(`${blue}`)
            .setDescription(`__**Modération**__
            ・\`kick <@joueur> <raison>\`: Sert a expulser un membre du serveur.
            ・\`ban <@joueur> <raison>\`: Sert a bannir définitivement un joueur du serveur.
            
            __**Utilitaires**__
            ・\`server\`: Sert a afficher les informations du serveur.
            ・\`help\`: Sert a afficher la liste des commandes.

            __**Musique**__
            ・\`play <lien youtube>\` Sert a jouer une musique dans un salon vocal.
            
            **__Autre__**
            ・\`pp <@joueur>\` Sert a obtenir sa pp ou celle d'un ou plusieurs joueur(s).`)
        message.channel.send(embed);
    }
};