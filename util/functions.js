const mongoose = require("mongoose")
const { Guild } = require("../models/modelsIndex") 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

module.exports = async (client) => {

    client.createGuild = async guild => {
        const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, guild);
        const createGuild = await new Guild(merged);
        createGuild.save().then(g => console.log(`Nouveau Serveur --> ${g.guildName}`));
    }

    client.getGuild = async guild => {
        const data = await Guild.findOne({ guildID: guild.id});
        if (data){
             return data;

        } else if (!data){
            const newGuild = {
                guildID: guild.id,
                guildName: guild.name
            };
            client.createGuild(newGuild);
    
            return client.getGuild2(guild);
        }
        
    }
    client.getGuild2 = async guild => {
        const data = await Guild.findOne({ guildID: guild.id});
        if (data){
             return data;
        } else {
            return client.getGuild(guild);;
        }
    }

    client.updateGuild = async (guild, settings) => {
        let data = await client.getGuild(guild);
        if (typeof data !== "object") data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] = settings[key];
        }
        console.log(settings);
        return data.updateOne(settings).catch(error => {
            console.log(error);
        })

    }
};