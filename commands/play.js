const { blue, green, yellow, red } = require(`./colors.json`)
const { MessageEmbed } = require('discord.js');
const ytdl = require("ytdl-core");
const ytSearch = require('yt-search');
const message = require('../events/guild/message');
const queue = new Map();
var loop = false;
var skipped = false;
var msgE;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

var list = [];

module.exports = {
    name: 'play',
    aliases: ['p', 'pl', 'stop', 'skip', 'sk', 'queue', 'list', 'loop'],
    description: 'Jouer de la musique',

    
    async execute(client, message, settings, args, cmd) {

        const embedSend = new MessageEmbed()
                    .setTitle(`Recherche`)
                    .setColor(`${yellow}`)
                    .setDescription(`:arrows_counterclockwise: Recherche de la vidéo`)
                    

        const voice_channel = message.member.voice.channel;

        if(!message.guild)return;
        const receivedEmbed = message.embeds[0];

        const server_queue = queue.get(message.guild.id);


        if(cmd == 'play' || cmd == 'pl',  cmd == 'p') {
            if(args == 0){
                const embed = new MessageEmbed(receivedEmbed)
                    .setTitle(`Erreur`)
                    .setColor(`${red}`)
                    .setDescription(`:x: Veuillez entrer un lien youtube`)
                return message.channel.send(embed); 
            }

            if(!voice_channel) {
                const embed = new MessageEmbed(receivedEmbed)
                    .setTitle(`Erreur`)
                    .setColor(`${red}`)
                    .setDescription(`:x: Vous n'êtes pas dans un salon vocal`)
                return message.channel.send(embed);
            }

            let song = {};

            if(ytdl.validateURL(args[0])) {
                
                await message.channel.send(embedSend).then(async msg => {
                    msgE = msg
                    const song_info = await ytdl.getInfo(args[0]);
                    song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url, videoID: song_info.videoDetails.videoId}

                })

                embed = new MessageEmbed()
                    .setAuthor(`Chargement`)
                    .setTitle(`${song.title}`)
                    .setURL(`${song.url}`)
                    .setColor(`${yellow}`)
                    .setDescription(`:arrows_counterclockwise: Chargement de la vidéo`)
                    .setThumbnail(`https://img.youtube.com/vi/${song.videoID}/maxresdefault.jpg`)
                msgE.edit(embed);
                
                const connection = await message.member.voice.channel.join();

            } else {
                const video_finder = async (query) => {
                    await message.channel.send(embedSend).then(async msg => {
                        msgE = msg    
                    })

                    const videoResult = await ytSearch(query);
                    return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
                }

                const video = await video_finder(args.join(' '));
                if(video){
                    song = {title: video.title, url:video.url, videoID: video.videoId}
                    const embed = new MessageEmbed()
                        .setAuthor(`Chargement`)
                        .setTitle(`${song.title}`)
                        .setURL(`${song.url}`)
                        .setColor(`${yellow}`)
                        .setDescription(`:arrows_counterclockwise: Chargement de la vidéo`)
                        .setThumbnail(`https://img.youtube.com/vi/${song.videoID}/maxresdefault.jpg`)
                        msgE.edit(embed);
                } else {
                    const embed = new MessageEmbed(receivedEmbed)
                        .setTitle(`Erreur`)
                        .setColor(`${red}`)
                        .setDescription(`:x: La vidéo est introuvable ou le lien est invalide`)
                    msgE.edit(embed);
                }
            }

            if(!server_queue) {
                const queue_constructor = {
                    voice_channel: voice_channel,
                        text_channel: message.channel,
                        connection: null,
                        songs: []
                }
    
                queue.set(message.guild.id, queue_constructor);
                queue_constructor.songs.push(song);
                list.push(`${song.title}`);
                try {
                    const connection = await voice_channel.join();
                    queue_constructor.connection = connection;
                    video_player(message.guild, queue_constructor.songs[0], message);
                } catch (err) {
                    queue.delete(message.guild.id);
                    const embed = new MessageEmbed(receivedEmbed)
                        .setTitle(`Erreur`)
                        .setColor(`${red}`)
                        .setDescription(`:x: Le salon est inaccessible !`)
                    message.channel.send(embed);
                    throw err;
                }
            } else {
                server_queue.songs.push(song);
                list.push(`${song.title}`);
                const embed = new MessageEmbed()
                        .setAuthor(`Ajout réussi`)
                        .setTitle(`${song.title}`)
                        .setURL(`${song.url}`)
                        .setColor(`${green}`)
                        .setDescription(`:white_check_mark: Vidéo ajouté a la liste !`)
                        .setThumbnail(`https://img.youtube.com/vi/${song.videoID}/maxresdefault.jpg`)
                    msgE.edit(embed);
            }

        }

        else if(cmd == 'stop') stop_song(message, server_queue);
        else if(cmd == 'skip' || cmd == 'sk') skip_song(message, server_queue);
        else if(cmd == 'queue' || cmd == 'list') queue_list(message, server_queue);
        else if(cmd == 'loop') loop_song(message);


    }
    
};

const video_player = async (guild, song, message) => {
    const song_queue = queue.get(guild.id);

    if(!song) {
        song_queue.voice_channel.leave();
        queue.delete(guild.id);
        return
    }
    
    const stream = ytdl(song.url, { filter: 'audioonly'});

    song_queue.connection.play(stream, { seek: 0, volume: 0.5})
        .on('finish',() => {
            if(!loop){
                list.shift();
            song_queue.songs.shift();
            video_player(guild, song_queue.songs[0], message);
            } else {
                video_player(guild, song_queue.songs[0], message);
            }
        });
        if (!loop) { 
        const embed = new MessageEmbed()
        .setAuthor(`Lecture`)
        .setTitle(`${song.title}`)
        .setURL(`${song.url}`)
        .setColor(`${green}`)
        .setDescription(`:white_check_mark: Lecture de la vidéo`)
        .setThumbnail(`https://img.youtube.com/vi/${song.videoID}/maxresdefault.jpg`)
    await msgE.edit(embed);
    }
    if (skipped) { 
        const embed = new MessageEmbed()
        .setAuthor(`Lecture`)
        .setTitle(`${song.title}`)
        .setURL(`${song.url}`)
        .setColor(`${green}`)
        .setDescription(`:white_check_mark: Lecture de la vidéo`)
        .setThumbnail(`https://img.youtube.com/vi/${song.videoID}/maxresdefault.jpg`)
    await message.channel.send(embed);
    }
}

const skip_song = async (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!');
    if(!server_queue){
        return message.channel.send(`There are no songs in queue 😔`);
    }

    if (loop) {
    loop_song(message, true);
    skipped = true;
    const embed = new MessageEmbed()
        .setTitle(`Skip`)
        .setColor(`${blue}`)
        .setDescription(`:white_check_mark: Vous avez sauté une musique`)
    message.channel.send(embed);

    await server_queue.connection.dispatcher.end();
    await delay(500)
    skipped = false;
    loop_song(message, true);
    }
    if (!loop) {
        skipped = true;
        const embed = new MessageEmbed()
            .setTitle(`Skip`)
            .setColor(`${blue}`)
            .setDescription(`:white_check_mark: Vous avez sauté une musique`)
        message.channel.send(embed);
    
        server_queue.connection.dispatcher.end();
        await delay(500)
        skipped = false;
    }
}

const stop_song = (message, server_queue) => {

    if (!message.member.voice.channel) {
        const embed = new MessageEmbed()
            .setTitle(`Erreur`)
            .setColor(`${red}`)
            .setDescription(`:x: Vous devez etre dans un salon vocal !`)
        return message.channel.send(embed);
    }
    
    if(!server_queue) {
        const embed = new MessageEmbed()
            .setTitle(`Erreur`)
            .setColor(`${red}`)
            .setDescription(`:x: Il n'y a pas de musique a arreter !`)
        return message.channel.send(embed);
    }
    
    server_queue.songs = [];
    list = [];
    try {
        server_queue.connection.dispatcher.end();
    } catch (error) { 
        const embed = new MessageEmbed()
            .setTitle(`Erreur`)
            .setColor(`${red}`)
            .setDescription(`:x: La musique n'a pas pu s'arreter`)
            .setFooter(`${error}`)
        return message.channel.send(embed);
    }

    if(loop)loop_song(message);

    const embed = new MessageEmbed()
        .setTitle(`Arrêt`)
        .setColor(`${blue}`)
        .setDescription(`:white_check_mark: Vous avez arrété la musique`)
    message.channel.send(embed);


}

const queue_list = (message) => {
    loopStatus = "désactivé";
    msg = [];
    msgSend = "";
    for( i = 0; i < list.length; i++) {
        msg.push(`${i+1} - ${list[i]}\n`)
    
    }
    if(loop){
        loopStatus = "activé";
    }
    msgSend = `${msg}`
    
    for (i = 0; i < msg.length; i++) {
    msgSend = msgSend.replace(",", "");
    }

    const embed = new MessageEmbed()
        .setTitle(`Liste d'attente`)
        .setColor(`${blue}`)
        .setDescription(`${msgSend}`)
        .setFooter(`La boucle est ${loopStatus}`)
    message.channel.send(embed);
    
}

const loop_song = (message, skipped) => {
    if(!loop) {
        loop = true;
        if(skipped)return;
        const embed = new MessageEmbed()
            .setTitle(`Boucle activé`)
            .setColor(`${green}`)
            .setDescription(`:white_check_mark: Vous avez activé la boucle`)
        message.channel.send(embed);
    } else {
        loop = false;
        if(skipped)return;
        const embed = new MessageEmbed()
            .setTitle(`Boucle désactivé`)
            .setColor(`${green}`)
            .setDescription(`:white_check_mark: Vous avez désactivé la boucle`)
        message.channel.send(embed);
    }
}