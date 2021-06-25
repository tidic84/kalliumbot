const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red } = require('../colors.json')

module.exports = {
    name: 'help',
    description: 'Affiche la liste des commandes',
    
    execute(client, message, settings, args) {
        if (args[0] == null) {
        const embed = new MessageEmbed()
            .setTitle('Liste des commandes')
            .setColor(`${blue}`)
            .setDescription(`__**Modération**__
            ・\`kick <@joueur> <raison>\`: Sert a expulser un membre du serveur.
            ・\`ban <@joueur> <raison>\`: Sert a bannir définitivement un joueur du serveur.

            __**Utilitaires**__
            ・\`server\`: Afficher les informations du serveur.
            ・\`help\`: Afficher la liste des commandes.
            ・\`clear <nombre entre 0 et 100>\`: Sert a supprimer des messages.
            ・\`config <valeur> <nouvelle valeur>\` Affiche ou modifie des paramètres

            __**Musique**__
            ・\`play <lien / nom de vidéo>\` Sert a jouer une musique dans un salon vocal.
            ・\`skip\` Saute une musique.
            ・\`stop\` Arrête la musique.
            ・\`queue\` Affiche la liste d'attente des musiques

            __**Economie**__
            ・\`work\` Te fais gagner de l'argent en travaillant
            ・\`deposit <amount/all>\` Dépose de l'argent a la banque
            ・\`withdraw <amount/all>\` Retire de l'argent a la banque
            ・\`pay <@joueur> <amount/all>\` Transfère de l'argent a un membre
            ・\`add-money <@joueur> <amount> <wallet/bank>\` Ajoute de l'argent a un joueur
            ・\`set-money <@joueur> <amount> <wallet/bank>\` Définit l'argent d'un joueur

            **__Autre__**
            ・\`avatar <@joueur>\` Sert a obtenir l'avatar ou celle d'un ou plusieurs joueur(s).
            ・\`embed <#salon> <titre> <texte>\` Envoie un embed personnalisé
            ・\`anime <nom d'animé>\` Donne des informations sur un animé`)
            
            .setFooter("Pour plus de détails sur une commande: help <commande>")
        message.channel.send(embed);
        
        } else {
            switch(args[0]) {
                
                case"ban":{
                    const embed1 = new MessageEmbed()
                            .setTitle('Help - Ban')
                            .setColor(`${blue}`)
                            .setDescription(`__**Ban**__

                            ・ban | <@joueur> | <raison>
                            
                            Le joueur doit etre mentionné
                            La raison est facultative
                            `)
                            .setFooter("Pour plus de détails sur une commande: help <commande>")
                        return message.channel.send(embed1);
                }
                case"kick": {
                    const embed1 = new MessageEmbed()
                        .setTitle('Help - Kick')
                        .setColor(`${blue}`)
                        .setDescription(`__**Kick**__

                        ・kick | <@joueur> | <raison>
                        
                        Le joueur doit etre mentionné
                        La raison est facultative
                        `)
                        .setFooter("Pour plus de détails sur une commande: help <commande>")
                    return message.channel.send(embed1);
                }
                case"clear": {
                    const embed1 = new MessageEmbed()
                            .setTitle('Help - Clear')
                            .setColor(`${blue}`)
                            .setDescription(`__**Clear**__
    
                            ・clear | <nombre de messages>
                            
                            Le nombre de message doit etre compris entre 0 et 100
                            `)
                            .setFooter("Pour plus de détails sur une commande: help <commande>")
                        return message.channel.send(embed1);
                }
                case"play": {
                    const embed1 = new MessageEmbed()
                            .setTitle('Help - Play')
                            .setColor(`${blue}`)
                            .setDescription(`__**Play**__
    
                            ・play | <lien / nom vidéo>
                            
                            Pour faire fonctionner cette commande, il faut fournir un lien youtube ou le nom d'une vidéo youtube.

                            ・Alias: \`pl\`
                            `)
                            .setFooter("Pour plus de détails sur une commande: help <commande>")
                        return message.channel.send(embed1);
                }
                case"skip": {
                    const embed1 = new MessageEmbed()
                            .setTitle('Help - Skip')
                            .setColor(`${blue}`)
                            .setDescription(`__**Skip**__
    
                            ・skip
                            
                            Cette commande saute une musique.

                            ・Alias: \`sk\`
                            `)
                            .setFooter("Pour plus de détails sur une commande: help <commande>")
                        return message.channel.send(embed1);
                }
                case"stop": {
                    const embed1 = new MessageEmbed()
                                .setTitle('Help - Stop')
                                .setColor(`${blue}`)
                                .setDescription(`__**Stop**__
        
                                ・stop
                                
                                Cette commande arrete la/les musique(s).
    
                                `)
                                .setFooter("Pour plus de détails sur une commande: help <commande>")
                            return message.channel.send(embed1);
                }
                case"queue": {
                    const embed1 = new MessageEmbed()
                            .setTitle('Help - Queue')
                            .setColor(`${blue}`)
                            .setDescription(`__**Queue**__
    
                            ・queue
                            
                            Cette commande saute une musique.

                            ・Alias: \`list\`
                            `)
                            .setFooter("Pour plus de détails sur une commande: help <commande>")
                        return message.channel.send(embed1);
                }
                case"avatar": {
                    const embed1 = new MessageEmbed()
                        .setTitle('Help - Avatar')
                        .setColor(`${blue}`)
                        .setDescription(`__**Avatar**__

                        ・avatar | <@joueur>
                        
                        La mention du joueur est facultative, si personne n'est mentionné, c'est l'avatar de l'auteur de la commmande qui sera envoyé.
                        Une ou plusieurs mentions peuvent être mise.
                        
                        ・Alias: \`pp\`
                        `)
                        .setFooter("Pour plus de détails sur une commande: help <commande>")
                    return message.channel.send(embed1);
                }

            }

            const embed = new MessageEmbed()
                .setTitle('Inexistante')
                .setColor(`${blue}`)
                .setDescription(`:x: Cette commande est inexistante ou n'a pas plus de détails !`)
                .setFooter("Pour plus de détails sur une commande: help <commande>")
            return message.channel.send(embed);

        }
    }
};

