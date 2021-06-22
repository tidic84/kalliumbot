const { MessageEmbed } = require("discord.js")
const { blue, green, yellow, red } = require('../colors.json')
const { get } = require("request-promise");

module.exports = {
    name: 'anime',
    description: 'template',
    
    execute(client, message, settings, args) {

        if(!args) {
            return message.channel.send("Please Give Anime Name")
        }

       let option = {
        url: `https://kitsu.io/api/edge/anime?filter[text]=${args.join(' ')}`,
        method: `GET`,
        headers: {
          'Content-Type': "application/vnd.api+json",
          'Accept': "application/vnd.api+json"
  
        },
        json: true
      }
        const embedFet = new MessageEmbed()
            .setTitle("Chargement")
            .setDescription(":arrows_counterclockwise: Recherche des donnés en cours...")
            .setColor(yellow)
        message.channel.send(embedFet).then(msg => {
        get(option).then(body => {
        try {
            let embed = new MessageEmbed()
            .setTitle(body.data[0].attributes.titles.en)
            .setColor(blue)
            .setDescription(body.data[0].attributes.synopsis)
            .setThumbnail(body.data[0].attributes.posterImage.original)
            .addField("Ratings", body.data[0].attributes.averageRating)
            .addField("TOTAL EPISODES", body.data[0].attributes.episodeCount)
        //.setImage(body.data[0].attributes.coverImage.large)
        //try it
        
        
        message.channel.send(embed)
        msg.delete();
        
       } catch (err) {
        msg.delete();
        return message.channel.send("Unable to find this anime");
        }

        });
    });  
    }
};