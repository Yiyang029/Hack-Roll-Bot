const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'help me',
    execute(message) {
        const myEmbed = new EmbedBuilder()
            .setColor('Aqua')
            .setTitle('Your help guide on commands')
            .setDescription('This guide tells you the commands and how they works')
            .setThumbnail("https://img.freepik.com/premium-photo/cute-sad-cat-with-beautiful-eyes-looks-down-scottish-fold-cat_330426-756.jpg")
            .addFields(
                { name: 'cryreply', value: 'a cat pic so you wont cry alone' },
                { name: '!give: Transfer to others', value: 'This command transfers your money to other people with an indicated amount. Call the command in the form of !give <amount> @<username>.'},
                { name: '!modgive: Transfer to others and yourself', value: 'This command transfers to others without deducting your own money and adds money to your balance. Call the command in the form of !give <amount> @<username>.' },
                { name: '!bal: checks balance', value: 'This command helps you to check your balance.'},
                
            )

            message.channel.send({ embeds: [myEmbed]});
    }
};

