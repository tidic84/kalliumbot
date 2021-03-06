const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red } = require('../colors.json')

module.exports = {
    name: 'ban',
    description: 'Sert a bannir des joueurs du serveur',
    
    async execute(client, message, settings, args) {
        if(!message.member.hasPermission('BAN_MEMBERS')) {
            const embed = new MessageEmbed()
                .setTitle(`Erreur`)
                .setColor(`${red}`)
                .setDescription(`:x: Vous n'avez pas la permission d'utiliser cette commande !`)
        return message.channel.send(embed);
        }
        const member = message.mentions.members.first()

        if (!member) {
            const embed = new MessageEmbed()
                .setTitle(`Erreur`)
                .setColor(`${red}`)
                .setDescription(`:x: Vous ne pouvez pas bannir Casper !`)
        return message.channel.send(embed);
        }

        if (member.id === message.guild.ownerID) {
            const embed = new MessageEmbed()
                .setTitle(`Erreur`)
                .setColor(`${red}`)
                .setDescription(`:x: Vous ne pouvez pas bannir le propriétaire du serveur !`)
        return message.channel.send(embed);
        }

        const reason = args.slice(1).join(' ') || "Aucune raison fournie";
        try {
            await member.ban({reason})
            } catch (error) {
                if (error == 'DiscordAPIError: Missing Permissions'){
                    const embed = new MessageEmbed()
                    .setTitle(`Erreur`)
                    .setColor(`${red}`)
                    .setDescription(`:x: Tu n'as pas les permission pour bannir ce membre`)
                return message.channel.send(embed);
                }
                const embed = new MessageEmbed()
                    .setTitle(`Erreur`)
                    .setColor(`${red}`)
                    .setDescription(`:x: Une erreur est survenue`)
                    .setFooter(error)
                return message.channel.send(embed);
            }
        const embed = new MessageEmbed()
                .setTitle(`Ban`)
                .setColor(`${green}`)
                .setDescription(`:white_check_mark: ${member.user.tag} a été banni !`)
        message.channel.send(embed);
        
    }
};