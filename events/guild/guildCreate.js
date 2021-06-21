const mongoose = require("mongoose")
const { Guild } = require("../../models/modelsIndex") 

module.exports = async (Discord, client, guild) => {

    console.log(guild.name)
    console.log(guild.id)


    const newGuild = {
        guildID: guild.id,
        guildName: guild.name
    };

    const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, newGuild);

    const createGuild = await new Guild(merged);
    createGuild.save().then(g => console.log(`Nouveau Serveur --> ${g.guildName}`));
};