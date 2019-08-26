
var express = require("express");
var app = express();
const bodyParser = require('body-parser');
const { accounts, students } = require('./db.js')
// app.use(express.static("public"));
// app.set("view engine", "ejs");
// app.set("views","./views")

var server = require("http").Server(app);
server.listen(3000, () => console.log('server chay port 3000'));
app.use(require("body-parser").json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.get("/",function(req,res){
//     res.render("trangchu");
// });
app.get("/", (req, res) => res.send('xin chao'));
// get list accounts
app.get('/accounts_read', (req, res) => {
    accounts.findAll()
        .then((accounts) => res.json({ 'kq': 1, 'accounts': accounts }))
        .catch(err => res.json({ 'kq': 0 }))
})
// add accounts
app.post('/accounts_add', (req, res) => {
    let email = req.body.email
    let full_name = req.body.full_name
    let roll = req.body.roll
    let phone_number = req.body.phone_number
    let address = req.body.address
    // let is_active = req.body.is_active
    accounts.create({
        email: email,
        full_name: full_name,
        roll: roll,
        phone_number: phone_number,
        address: address,
        is_active: true,
    }).then(() => res.json({ 'kq': 1 }))
        .catch(err => res.json({ 'kq': 0 }))
})
// update accounts
app.post('/accounts_update', (req, res) => {
    const { id,
        email,
        full_name,
        roll,
        phone_number,
        address,
        is_active
    } = req.body
    accounts.update({
        id: id,
        email: email,
        full_name: full_name,
        roll: roll,
        phone_number: phone_number,
        address: address,
        is_active: is_active

    }, {
            where: { id: id }
        })
        .then((row) => res.json({ 'kq': 1, 'row': row[0] }))
        .catch(err => res.json({ 'kq': 0 }))
})
// delette accounts
app.post('/accounts_update', (req, res) => {
    const { id,
        email,
        full_name,
        roll,
        phone_number,
        address,
        // is_active
    } = req.body
    accounts.update({
        id: id,
        email: email,
        full_name: full_name,
        roll: roll,
        phone_number: phone_number,
        address: address,
        is_active: false

    }, {
            where: { id: id }
        })
        .then((row) => res.json({ 'kq': 1, 'row': row[0] }))
        .catch(err => res.json({ 'kq': 0 }))
})

// get list students
app.post('/students_add', (req, res) => {
    let email = req.body.email
    let full_name = req.body.full_name
    let phone_number = req.body.phone_number
    let address = req.body.address
    let attended = req.body.is_active
    let createBy = req.body.createBy
    let updateBy = req.body.updateBy
    let is_delete = req.body.is_delete

    students.create({
        email: email,
        full_name: full_name,
        phone_number: phone_number,
        address: address,
        attended: attended,
        createBy: createBy,
        updateBy: updateBy,
        is_delete: is_delete,
    }).then(() => res.json({ 'kq': 1 }))
        .catch(err => res.json({ 'kq': 0 }))
})
// update students
app.post('/students_update', (req, res) => {
    const { id,
        email,
        full_name,
        phone_number,
        address,
        attended,
        createBy,
        updateBy,
        is_delete,
    } = req.body
    students.update({
        id: id,
        email: email,
        full_name: full_name,
        phone_number: phone_number,
        address: address,
        attended: attended,
        createBy: createBy,
        updateBy: updateBy,
        is_delete: is_delete
    }, {
            where: { id: id }
        })
        .then((row) => res.json({ 'kq': 1, 'row': row[0] }))
        .catch(err => res.json({ 'kq': 0 }))
})
// delete students
app.post('/students_update', (req, res) => {
    const {
        id,
        email,
        full_name,
        phone_number,
        address,
        attended,
        createBy,
        updateBy,
        is_delete,
    } = req.body
    students.update({
        id: id,
        email: email,
        full_name: full_name,
        phone_number: phone_number,
        address: address,
        attended: attended,
        createBy: createBy,
        updateBy: updateBy,
        is_delete: true

    }, {
            where: { id: id }
        })
        .then((row) => res.json({ 'kq': 1, 'row': row[0] }))
        .catch(err => res.json({ 'kq': 0 }))
})