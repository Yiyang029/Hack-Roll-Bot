module.exports = {
    name: "give",
    execute(message, getBalance, messageArray, addBalance, target) {
        const currentAmount = getBalance(message.author.id);
        var transferAmount = 0;
        //check if there are any mentions
        if (message.mentions.users.first() == undefined || 
            message.mentions.users.first().id == message.author.id) {
            message.channel.send("You can't transfer yourself!");
        //check if number of args is correct (1 mention and 1 amount)
        } else if (messageArray[2] == undefined) {
            message.channel.send("sdhfos");
        //check if amount came first
        } else if (Number.isInteger(Number(messageArray[1]))) {
            var transferAmount = Number(messageArray[1]);
        //amount came second
        } else if (Number.isInteger(Number(messageArray[2]))) {
            var transferAmount = Number(messageArray[2]);
    
        } else {
            message.channel.send('invalid amount');
        }
        //const transferTraget = target;
        
        if (transferAmount > currentAmount) return message.channel.send(`You don't have enough :(`);
        if (transferAmount <= 0) return message.channel.send("???");

        addBalance(message.author.id, -transferAmount);
        addBalance(target.id, transferAmount);

        return message.channel.send("done");
    }
}