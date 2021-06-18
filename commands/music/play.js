const { MessageEmbed } = require('discord.js');
var path = require('path');
var appDir = path.dirname(require.main.filename);

const { blue, green, yellow, red } = require(`${appDir}/commands/colors.json`)

module.exports = {
    name: 'play',
    aliases: ['skip', 'stop'],
    description: 'Jouer de la musique',
    
    async execute(message, args) {
        if(!message.guild)return;
        const receivedEmbed = message.embeds[0];

        if(args == 0){
            const embed = new MessageEmbed(receivedEmbed)
                .setTitle(`Erreur`)
                .setColor(`${red}`)
                .setDescription(`:x: Veuillez entrer un lien youtube`)
            return message.channel.send(embed);
        }

        if(message.member.voice.channel) {
            const embed = new MessageEmbed(receivedEmbed)
                .setTitle(`Attente`)
                .setColor(`${yellow}`)
                .setDescription(`:arrows_counterclockwise: Chargement de la vidéo`)
            message.channel.send(embed);
            
            const ytdl = require("ytdl-core");
            const connection = await message.member.voice.channel.join();


            const dispatcher = connection.play(ytdl(args[0]), {
                volume: 0.5,

        });
        dispatcher.on("start", () => {
            message.client.user.setActivity("Youtube", {type: "LISTENING"})
            const embed = new MessageEmbed(receivedEmbed)
                .setTitle(`Lecture`)
                .setColor(`${green}`)
                .setDescription(`:white_check_mark: Lecture de la vidéo`)
            message.channel.send(embed);
            })

        dispatcher.on("error", () => {
            const embed = new MessageEmbed(receivedEmbed)
                .setTitle(`Erreur`)
                .setColor(`${red}`)
                .setDescription(`:x: La vidéo est introuvable ou le lien est invalide`)
            message.channel.send(embed);
            message.member.voice.channel.leave();


            })

        dispatcher.on("finish", () => {
            message.member.voice.channel.leave();
        })

        } else {
            message.reply("Tu as besoin de rejoindre un channel vocal !")
        }
    }
};