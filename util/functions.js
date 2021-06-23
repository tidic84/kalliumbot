const mongoose = require("mongoose")
const { Guild, Profile } = require("../models/modelsIndex") 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

module.exports = async (client) => {

    // Guild Functions

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

    // User Functions

    client.createProfile = async (member) => {
        const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, member);
        const createProfile = await new Profile(merged);
        createProfile.save().then(m => console.log(`Nouveau Membre -->  ${m.userName}  <-- dans ${m.serverID}`));
    }

    client.getProfile = async (member, memberGuild) => {
        var data = "";

        if(memberGuild != undefined) data = await Profile.findOne({ userID: member.id, serverID: memberGuild});
        else data = await Profile.findOne({ userID: member.id, serverID: member.guild.id});
        

        if (data){
             return data;

        } else if (!data){
            if(memberGuild != undefined) {
            const newProfile = {
                userID: member.id,
                userName: member.username,
                serverID: memberGuild,
                coins: 100,
                bank: 0
            };
            await client.createProfile(newProfile);
    
            
            return await client.getProfile2(member, memberGuild);
            

            } else {
                const newProfile = {
                    userID: member.id,
                    userName: member.displayName,
                    serverID: member.guild.id,
                    coins: 100,
                    bank: 0
                };
                client.createProfile(newProfile);
        
                return client.getProfile2(member);

            }
        }    
        
    }

    client.getProfile2 = async (member, memberGuild) => {
        var data = "";
        if(memberGuild != undefined) data = await Profile.findOne({ userID: member.id, serverID: memberGuild});
        else data = await Profile.findOne({ userID: member.id, serverID: member.guild.id});
        
        if (data){
             return data;
        }
    }

    client.updateProfile = async (member, settings, memberGuild) => {
        let data = "";
        if (memberGuild != "undefined") data = await client.getProfile(member, memberGuild);
        else data = await client.getProfile(member);
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