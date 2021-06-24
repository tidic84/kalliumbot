const { MessageEmbed } = require('discord.js');
const { REPL_MODE_SLOPPY } = require('repl');
const { blue, green, yellow, red } = require('../colors.json')
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

module.exports = {
    name: 'balance',
    aliases: ['bal', 'bl', 'money'],
    description: 'Affiche l\'argent',
    
    async execute(client, message, settings, args, cmd, profileData) { 

        if (!message.mentions.users.size){
            const embed = new MessageEmbed()
                .setTitle(`${message.member.displayName}'s Balance `)
                .setThumbnail(`${message.author.displayAvatarURL({ dynamic : true})}`)
                .setColor(`${blue}`)
                .addFields(
                    { name: "Wallet", value: `$${profileData.coins}`, inline: true},
                    { name: "Bank", value: `$${profileData.bank}`, inline: true},
                    { name: "Total", value: `$${profileData.coins + profileData.bank}`, inline: true},
                )
            message.channel.send(embed);

            } else {
            var profileDataMention = "";
            const userMention = message.mentions.users.map(async user => {
                if(message.mentions.users.first().bot){
                    const embed = new MessageEmbed()
                        .setTitle('Erreur')
                        .setDescription(` **${args[0]}** est un bot`)
                        .setColor(`${red}`)
                    return message.channel.send(embed);
                }
                profileDataMention = await client.getProfile(user, message.guild.id);
                await delay(50)
                profileDataMention = await client.getProfile(user, message.guild.id);
            const embed = new MessageEmbed()
                .setTitle(`${user.username}'s Balance `)
                .setThumbnail(`${user.displayAvatarURL({ dynamic : true})}`)
                .setColor(`${blue}`)
                .addFields(
                    { name: "Wallet", value: `$${profileDataMention.coins}`, inline: true},
                    { name: "Bank", value: `$${profileDataMention.bank}`, inline: true},
                    { name: "Total", value: `$${profileDataMention.coins + profileDataMention.bank}`, inline: true},
                )
            message.channel.send(embed);

        })
        }
    }
};
