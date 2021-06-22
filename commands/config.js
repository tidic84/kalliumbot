const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red } = require('../colors.json')

module.exports = {
    name: 'config',
    description: 'config',
    
    async execute(client, message, settings, args) {
        const getSetting = args[0];
        const newSetting = args.slice(1).join(" ");

        switch(getSetting) {
            case"prefix": {
                if(newSetting){
                await client.updateGuild(message.guild, { prefix: newSetting});
                return message.channel.send(`Le préfix est désormais \`${newSetting}\``)
                } else {
                    message.channel.send(`Prefix actuel: \`${settings.prefix}\``);
                    break;
                }
            }
            case"welcome-channel": {
                if(newSetting){
                await client.updateGuild(message.guild, { welcomeChannel: newSetting});
                return message.channel.send(`Le salon de bienvenue est désormais: \`${newSetting}\``)
                } else {
                    message.channel.send(`Le salon de bienvenue est: \`${settings.welcomeChannel}\``);
                    break;
                }
            }
            case"welcome-message": {
                if(newSetting){
                await client.updateGuild(message.guild, { welcomeMessage: newSetting});
                return message.channel.send(`Le message de bienvenue est désormais: \`${newSetting}\``)
                } else {
                    message.channel.send(`Le message de bienvenue est: \`${settings.welcomeMessage}\``);
                    break;
                }
            }
            case"leave-message": {
                if(newSetting){
                await client.updateGuild(message.guild, { leaveMessage: newSetting});
                return message.channel.send(`Le message d'aurevoir est désormais: \`${newSetting}\``)
                } else {
                    message.channel.send(`Le message d'aurevoir est: \`${settings.leaveMessage}\``);
                    break;
                }
            }
        }
        // const embed = new MessageEmbed()
        //     .setTitle(`Prefix actuel: \`${settings.prefix}\``)
        //     .setColor(`${blue}`)
        // message.channel.send(embed);
    }
};