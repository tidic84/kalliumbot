const mongoose = require ('mongoose');

const { DEFAULTSETTINGS: defaults } = require("../config");

const guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    guildName: String,
    prefix: {
        "type": String,
        "default": defaults.prefix
    },
    currency: {
        "type": String,
        "default": defaults.currency
    },
    leaveMessage: {
        "type": String,
        "default": defaults.leaveMessage
    },
    welcomeMessage: {
        "type": String,
        "default": defaults.welcomeMessage
    },
    welcomeChannel: {
        "type": String,
        "default": "undefined"
    },
    welcomeRole: {
        "type": Array,
        "default": ["undefined"]
    }
});

module.exports = mongoose.model("Guild", guildSchema);