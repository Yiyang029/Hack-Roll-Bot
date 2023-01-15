const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
});

//seq model 
/*const Tags = sequelize.define('tags', {
    name: {
        type: Sequelize.STRING,
        unique: true,
    },
    description: Sequelize.TEXT,
    username: Sequelize.STRING,
    usage_count: {
        type: Sequelize.INTEGER,
        defaultvalue: 0,
        allowNull: false,
    },
});*/

const Users = require('./Currency/Users.js') (sequelize, Sequelize.DataTypes);

/*const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({force}).then(async () => {
    await Promise.all();
    console.log('Database synced');

    sequelize.close();
}).catch(console.error);*/

module.exports = { Users };
