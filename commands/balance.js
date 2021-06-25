const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red } = require('../colors.json')
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const {MessageButton} = require("discord-buttons");
var msg = "";
module.exports = {
    name: 'balance',
    aliases: ['bal', 'bl', 'money'],
    description: 'Affiche l\'argent',
    
    async execute(client, message, settings, args, cmd, profileData, Discord) { 

        if (!message.mentions.users.size){
            const embed = new MessageEmbed()
                .setTitle(`:scales: ${message.member.displayName}'s Balance `)
                .setThumbnail(`${message.author.displayAvatarURL({ dynamic : true})}`)
                .setColor(`${blue}`)
                .addFields(
                    { name: "Wallet", value: `${settings.currency} ${client.separator(profileData.coins)}`, inline: true},
                    { name: "Bank", value: `${settings.currency} ${client.separator(profileData.bank)}`, inline: true},
                    { name: "Total", value: `${settings.currency} ${client.separator(profileData.coins + profileData.bank)}`, inline: true}
                )

            const depAll = new MessageButton()
                    .setStyle("blurple")
                    .setLabel("Déposer Tout")
                    .setID("depAll")

            const withAll = new MessageButton()
                .setStyle("blurple")
                .setLabel("Retirer Tout")
                .setID("withAll")
            
            message.channel.send({ embed: embed,  buttons: [depAll, withAll] }).then(m => {
                const filter = (button) => button.clicker.user.id === message.author.id
                const collector = m.createButtonCollector(filter, { time: 30000 })

                collector.on('collect', async b => {
                    b.defer()
                    if(b.id === "depAll") {
                        command = client.commands.get("deposit");
                        command.execute(client, message, settings, ["all"], "undefined", profileData, Discord);
                        collector.stop()
                    }
                    if(b.id === "withAll") {
                        command = client.commands.get("withdraw");
                        command.execute(client, message, settings, ["all"], "undefined", profileData, Discord);
                        collector.stop()
                        
                    }
                })
            });

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
                    { name: "Wallet", value: `${settings.currency} ${client.separator(profileDataMention.coins)}`, inline: true},
                    { name: "Bank", value: `${settings.currency} ${client.separator(profileDataMention.bank)}`, inline: true},
                    { name: "Total", value: `${settings.currency} ${client.separator(profileDataMention.coins + profileDataMention.bank)}`, inline: true},
                )
            message.channel.send(embed);

        })
        }
    }
};
