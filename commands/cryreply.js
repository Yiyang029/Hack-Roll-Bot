const { AttachmentBuilder, DiscordAPIError, messageLink } = require("discord.js");

module.exports = {
    name: "cryreply",
    description: "cries",
    execute(message) { 
        
        message.channel.send('https://img.freepik.com/premium-photo/cute-sad-cat-with-beautiful-eyes-looks-down-scottish-fold-cat_330426-756.jpg');

        
    }

    
}