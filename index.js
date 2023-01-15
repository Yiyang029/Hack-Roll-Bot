const { Client, Events, Collection, GatewayIntentBits, EmbedBuilder, codeBlock } = require(`discord.js`); 
const { token } = require("./config.json");
const fs = require('node:fs');
const path = require('node:path');

//currency 
const { Op } = require('sequelize');
const { Users } = require('./dbInit.js'); 
const currency = new Collection();
const prefix = '!';


const client = new Client({ intents: 
                            [ GatewayIntentBits.Guilds,
                              GatewayIntentBits.GuildMessages,
                              GatewayIntentBits.GuildMembers,
                              GatewayIntentBits.MessageContent
                            ]
                             }
                        );
                        


client.once(Events.ClientReady, async () => {
    //sync currency collection (seq)
    const storedBalances = await Users.findAll();
    storedBalances.forEach(b => currency.set(b.user_id, b));

	console.log('Ready');
});
client.commands = new Collection();

//Slash command handler 
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

//command handler
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
  } else if ('execute' in command && !('data' in command)) {
    client.commands.set(command.name, command);
  } else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}



client.on('messageCreate', (message) => {
   if (message.author.bot) {return;}
   else if (message.content.includes("cry") || message.content.includes("crying")) {
    client.commands.get('cryreply').execute(message);
   } else {
    client.commands.get("inspo").execute(message);
   }
   
});


client.on('guildMemberAdd', (member) => {
  client.commands.get("welcome").execute(member);

});

//currency commands 

client.on('messageCreate', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
  
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
  
    const messageArray = message.content.split(" ");
    const argument = messageArray.slice(1);
    const cmd = messageArray[0];
  
    //First mentioned user
    var target = message.mentions.users.first();
    //For no mentions
    if (target == undefined) {
        var target = message.author;
      }
    const targetName = "<@" + target + ">";
    if (command == "bal") {
        return message.channel.send(`${targetName} has ${getBalance(target.id)}`);

    } else if (command == "give") {
        client.commands.get("give").execute(message, getBalance, messageArray, addBalance, target);
        
    } else if (command == "modgive") {
        const amt = Number(messageArray[1]);
        message.channel.send(`${amt} given to <@${target.id}>`);
        addBalance(target.id, amt);
    } else if (command == "help") {
        client.commands.get("help").execute(message);
        
    }
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    client.commands.get('iamreply').execute(message);

});
  
//currency part 2 (helper functions)
async function addBalance(id, amount) {
    const user = currency.get(id);

    if (user) {
        user.balance += amount;
        return user.save();
    }

    const newUser = await Users.create({user_id: id, balance:amount});
    currency.set(id, newUser);

    return newUser;
}

function getBalance(id) {
    const user = currency.get(id);
    if (user) {
        return user.balance;
    } else {
        return;
    }
}





































































client.login(token);