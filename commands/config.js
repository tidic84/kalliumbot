const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red } = require('../colors.json')
const { DEFAULTSETTINGS: defaults } = require("../config");

module.exports = {
    name: 'config',
    description: 'config',
    
    async execute(client, message, settings, args) {
        const getSetting = args[0];
        const newSetting = args.slice(1).join(" ");

        switch(getSetting) {
            case"prefix": {
                if(newSetting){
                    if(args[1] == "reset") {
                        message.channel.send(`Nouvelle valeur: \`${defaults.prefix}\``);
                        return client.updateGuild(message.guild, { prefix: defaults.prefix});
                    }                await client.updateGuild(message.guild, { prefix: newSetting});
                return message.channel.send(`Le préfix est désormais \`${newSetting}\``)
                } else {
                    message.channel.send(`Prefix actuel: \`${settings.prefix}\``);
                    break;
                }
            }
            case"currency": {
                if(newSetting){
                    if(args[1] == "reset") {
                        message.channel.send(`Nouvelle valeur: \`${defaults.currency}\``);
                        return client.updateGuild(message.guild, { currency: defaults.currency});
                    }                await client.updateGuild(message.guild, { currency: newSetting});
                return message.channel.send(`Le préfix est désormais \`${newSetting}\``)
                } else {
                    message.channel.send(`Prefix actuel: \`${settings.currency}\``);
                    break;
                }
            }
            case"welcome-channel": {
                if(newSetting){
                    if(args[1] == "reset") {
                        message.channel.send(`Nouvelle valeur: \`${defaults.welcomeChannel}\``);
                        return client.updateGuild(message.guild, { welcomeChannel: defaults.welcomeChannel});
                    }
                const welcomeChannelStr = newSetting
                    .toString()
                    .replace("<", "")
                    .replace(">", "")
                    .replace("#", "");
                await client.updateGuild(message.guild, { welcomeChannel: welcomeChannelStr});
                return message.channel.send(`Le salon de bienvenue est désormais: \`${welcomeChannelStr}\``)
                } else {
                    message.channel.send(`Le salon de bienvenue est: \`${settings.welcomeChannel}\``);
                    break;
                }
            }
            case"welcome-message": {
                if(newSetting){
                    if(args[1] == "reset") {
                        message.channel.send(`Nouvelle valeur: \`${defaults.welcomeMessage}\``);
                        return client.updateGuild(message.guild, { welcomeMessage: defaults.welcomeMessage});
                    }                await client.updateGuild(message.guild, { welcomeMessage: newSetting});
                return message.channel.send(`Le message de bienvenue est désormais: \`${newSetting}\``)
                } else {
                    message.channel.send(`Le message de bienvenue est: \`${settings.welcomeMessage}\``);
                    break;
                }
            }
            case"leave-message": {
                if(newSetting){
                    if(args[1] == "reset") {
                        message.channel.send(`Nouvelle valeur: \`${defaults.leaveMessage}\``);
                        return client.updateGuild(message.guild, { leaveMessage: defaults.leaveMessage});
                    }                await client.updateGuild(message.guild, { leaveMessage: newSetting});
                return message.channel.send(`Le message d'aurevoir est désormais: \`${newSetting}\``)
                } else {
                    message.channel.send(`Le message d'aurevoir est: \`${settings.leaveMessage}\``);
                    break;
                }
            }
            case"welcome-role": {
                if(newSetting){
                    if(args[1] == "reset") {
                        message.channel.send(`Nouvelle valeur: \`${defaults.welcomeRole}\``);
                        return client.updateGuild(message.guild, { welcomeRole: defaults.welcomeRole});
                    }
                const roleList = [];
                const rList = await message.mentions.roles.map(role => {
                    // role.toString().replace("<", "")
                    // role.toString().replace(">", "")
                    // role.toString().replace("@", "")
                    roleList.push(role)
                })

                await client.updateGuild(message.guild, { welcomeRole: roleList});
                return message.channel.send(`Le(s) role(s) est/sont désormais: \`${roleList}\``)
                } else {
                    message.channel.send(`Le(s) role(s) est/sont: \`${settings.welcomeRole}\``);
                    break;
                }
            }
        }
    }
};