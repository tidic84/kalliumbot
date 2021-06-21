const mongoose = require("mongoose")
const { Guild } = require("../models/modelsIndex") 

module.exports = async client => {

    client.createGuild = async guild => {
        const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, guild);
        const createGuild = await new Guild(merged);
        createGuild.save().then(g => console.log(`Nouveau Serveur --> ${g.guildName}`));
    }

    client.getGuild = async guild => {
        const data = await Guild.findOne({ guildID: guild.id});
        if (data) return data;
        console.log(`${data}`)
        return client.config.defaultSettings
    }
};