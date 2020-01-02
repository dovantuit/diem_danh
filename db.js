const sequelize = require('sequelize') // ORM - Hirbernate

const db = new sequelize({
    database: 'DiemDanh',
    username: 'postgres',
    password: '1',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    dialectOptions: { //Options
        ssl: false
    },
    define: { // not add 's' to model name
        freezeTableName: true
    }
})

db.authenticate()
    .then(() => console.log('>>> ket noi thanh cong'))
    .catch(err => console.log(err.message))

const accounts = db.define('accounts', { // model : table in database
    email: sequelize.STRING,
    password: sequelize.STRING,
    full_name: sequelize.STRING,
    birthday: sequelize.DATE
})
// accounts.create({
//     email: 'dovantuit@gmail.com',
//     password:'123456',
//     full_name: 'do van tu'
//     birthday: '2019-10-09 19:00:00-05'
// }).then(accounts => console.log(accounts.get({ plain: true })))
//     .catch(err => console.log(err.message))

// db.sync() // tao model
//     .then(() => console.log('>>>>>>all models tao thanh cong'))



module.exports = {accounts}