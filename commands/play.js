const { blue, green, yellow, red } = require(`./colors.json`)
const { MessageEmbed } = require('discord.js');
const ytdl = require("ytdl-core");

module.exports = {
    name: 'play',
    aliases: ['stop', 'skip'],
    description: 'Jouer de la musique',

    
    async execute(client, message, args, cmd) {
        
        if(!message.guild)return;
        const receivedEmbed = message.embeds[0];

        if(cmd == 'stop') return message.reply("Stop")

        if(cmd == 'play') {


            if(args == 0){
                const embed = new MessageEmbed(receivedEmbed)
                    .setTitle(`Erreur`)
                    .setColor(`${red}`)
                    .setDescription(`:x: Veuillez entrer un lien youtube`)
                return message.channel.send(embed); 
            }

            if(!message.member.voice.channel) {
                const embed = new MessageEmbed(receivedEmbed)
                    .setTitle(`Erreur`)
                    .setColor(`${red}`)
                    .setDescription(`:x: Vous n'êtes pas dans un salon vocal`)
                return message.channel.send(embed);
            }

            let song = {};

            if(ytdl.validateURL(args[0])) {
                const embed1 = new MessageEmbed()
                    .setTitle(`Recherche`)
                    .setColor(`${yellow}`)
                    .setDescription(`:arrows_counterclockwise: Recherche de la vidéo`)
                message.channel.send(embed1);

                const song_info = await ytdl.getInfo(args[0]);
                song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url, videoID: song_info.videoDetails.videoId}
                
                const embed = new MessageEmbed()
                    .setAuthor(`Chargement`)
                    .setTitle(`${song.title}`)
                    .setURL(`${song.url}`)
                    .setColor(`${yellow}`)
                    .setDescription(`:arrows_counterclockwise: Chargement de la vidéo`)
                    .setThumbnail(`https://img.youtube.com/vi/${song.videoID}/maxresdefault.jpg`)
                message.channel.send(embed);
                const connection = await message.member.voice.channel.join();

                const dispatcher = connection.play(ytdl(args[0]), {
                    volume: 0.5,

            });

            // Event Start
            dispatcher.on("start", () => {
                message.client.user.setActivity("Youtube", {type: "LISTENING"})
                const embed = new MessageEmbed()
                    .setAuthor(`Lecture`)
                    .setTitle(`${song.title}`)
                    .setURL(`${song.url}`)
                    .setColor(`${green}`)
                    .setDescription(`:white_check_mark: Lecture de la vidéo`)
                    .setThumbnail(`https://img.youtube.com/vi/${song.videoID}/maxresdefault.jpg`)
                message.channel.send(embed);
            })

            // Event Error
            dispatcher.on("error", () => {
                const embed = new MessageEmbed(receivedEmbed)
                    .setTitle(`Erreur`)
                    .setColor(`${red}`)
                    .setDescription(`:x: La vidéo est introuvable ou le lien est invalide`)
                message.channel.send(embed);
                message.member.voice.channel.leave();
             })

            // Event Finish
            dispatcher.on("finish", () => {
                message.member.voice.channel.leave();
            })

            }

        }

    }
};