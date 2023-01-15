const {GuildMember} = require("discord.js");

module.exports = {
    name:"welcome",
    description: "what happends when members join",
    execute(member) {
        //Welcome message
        const welcomeChannel = member.guild.channels.cache.get('1063722305886355467');
        const welcomeMessage = `welcome <@${member.id}> to the guild!`;

        welcomeChannel.send({content: welcomeMessage});
    

    //assign roles
    let welcomeRole = member.guild.roles.cache.find(role => role.name === 'member');
    member.roles.add(welcomeRole);

    }
}
