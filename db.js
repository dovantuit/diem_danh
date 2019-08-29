const sequelize = require('sequelize')

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

// db.authenticate()
//     .then(() => console.log('>>>>>> ket noi thanh cong'))
//     .catch(err => console.log(err.message))





const accounts = db.define('accounts', { // model : table in database
    email: sequelize.STRING,
    password: sequelize.STRING,
    full_name: sequelize.STRING,
    roll: sequelize.STRING,
    phone_number: sequelize.STRING,
    address: sequelize.STRING,
    is_active: sequelize.BOOLEAN
})
// accounts.create({
//     email: 'dovantuit@gmail.com',
//     password:'123456',
//     full_name: 'do van tu',
//     roll: 'cong tac vien',
//     phone_number: '0947213743',
//     address: '42 nguyen van bao, go vap',
//     is_active: true

// }).then(accounts => console.log(accounts.get({ plain: true })))
//     .catch(err => console.log(err.message))

const students = db.define('students', { // model : table in database
    email: sequelize.STRING,
    full_name: sequelize.STRING,
    phone_number: sequelize.STRING,
    address: sequelize.STRING,
    attended: sequelize.BOOLEAN,
    createBy: sequelize.STRING,
    updateBy: sequelize.STRING,
    is_delete: sequelize.BOOLEAN
})
// students.create({
//     email: 'dovantuit@gmail.com',
//     full_name: 'do van tien',
//     phone_number: '094723413',
//     address: '42 nguyen van troi',
//     attended: false,
//     createBy: 'do van tu',
//     updateBy: 'do van tu',
//     is_delete: false
// }).then(students => console.log(students.get({ plain: true })))
//     .catch(err => console.log(err.message))



// db.sync() // tao model
//     .then(() => console.log('>>>>>> tao thanh cong'))



module.exports = { accounts, students }