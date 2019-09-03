var express = require("express");
var app = express();
const bodyParser = require("body-parser");
const { accounts, students } = require("./db.js");
const { transporter } = require("./main"); // để gửi mail

var server = require("http").Server(app);
server.listen(3000, () => console.log(">>> server chay port 3000"));
app.use(require("body-parser").json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.get("/",function(req,res){
//     res.render("trangchu");
// });
app.get("/", (req, res) => res.send("xin chao"));
("use strict");
const nodemailer = require("nodemailer");
const path = require("path");
const ABSPATH = path.dirname(process.mainModule.filename); // Absolute path to our app directory

// get list accounts
app.get("/accounts_read", (req, res) => {
  accounts
    .findAll()
    .then(accounts => res.json({ kq: 1, accounts: accounts }))
    .catch(err => res.json({ kq: 0 }));
});
// add accounts
app.post("/accounts_add", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let full_name = req.body.full_name;
  let roll = req.body.roll;
  let phone_number = req.body.phone_number;
  let address = req.body.address;
  // let is_active = req.body.is_active
  accounts
    .create({
      email: email,
      password: password,
      full_name: full_name,
      roll: roll,
      phone_number: phone_number,
      address: address,
      is_active: true
    })
    .then(() => res.json({ kq: 1 }))
    .catch(err => res.json({ kq: 0 }));

  // gửi mail
  transporter.verify(function(error, success) {
    // Nếu có lỗi.
    if (error) {
      console.log(error);
    } else {
      //Nếu thành công.
      // console.log(`>>>>> Kết nối thành công tới ${email}`);
      transporter.sendMail(
        {
          from: "homelesshacker2060@gmail.com",
          to: email,
          subject: `TẠO TÀI KHOẢN THÀNH CÔNG`,
          html:
            `<p>Xin chào <b>${full_name.toUpperCase()}</b>. Chúc mừng bạn đã tạo tài khoản thành công, thông tin tài khoản của bạn là:</p><ul><li>Username: ` +
            email +
            `</li><li>Passwork: ` +
            password +
            `</li></ul>`
        },
        (error, info) => {
          if (error) {
            console.log(">>> error");
          } else {
            console.log(`>>> gửi mail thành công cho ${email}`);
          }
        }
      );
    }
  });

  //
});
// update accounts
app.post("/accounts_update", (req, res) => {
  const {
    id,
    email,
    password,
    full_name,
    roll,
    phone_number,
    address,
    is_active
  } = req.body;
  accounts
    .update(
      {
        id: id,
        email: email,
        password: password,
        full_name: full_name,
        roll: roll,
        phone_number: phone_number,
        address: address,
        is_active: is_active
      },
      {
        where: { id: id }
      }
    )
    .then(row => res.json({ kq: 1, row: row[0] }))
    .catch(err => res.json({ kq: 0 }));
});
// delette accounts
app.post("/accounts_update", (req, res) => {
  const {
    id,
    email,
    password,
    full_name,
    roll,
    phone_number,
    address
    // is_active
  } = req.body;
  accounts
    .update(
      {
        id: id,
        email: email,
        password: password,
        full_name: full_name,
        roll: roll,
        phone_number: phone_number,
        address: address,
        is_active: false
      },
      {
        where: { id: id }
      }
    )
    .then(row => res.json({ kq: 1, row: row[0] }))
    .catch(err => res.json({ kq: 0 }));
});
// get list students
app.get("/students_read", (req, res) => {
  students
    .findAll()
    .then(students => res.json({ kq: 1, students: students }))
    .catch(err => res.json({ kq: 0 }));
});
// add students
app.post("/students_add", (req, res) => {
  let email = req.body.email;
  let full_name = req.body.full_name;
  let phone_number = req.body.phone_number;
  let address = req.body.address;
  let attended = req.body.is_active;
  let createBy = req.body.createBy;
  let updateBy = req.body.updateBy;
  let is_delete = req.body.is_delete;

  students
    .create({
      email: email,
      full_name: full_name,
      phone_number: phone_number,
      address: address,
      attended: false,
      createBy: createBy,
      updateBy: updateBy,
      is_delete: false
    })
    .then(() => res.json({ kq: 1 }))
    .catch(err => res.json({ kq: 0 }));

  // gửi mail
  transporter.verify(function(error, success) {
    // Nếu có lỗi.
    if (error) {
      console.log(error);
    } else {
      //Nếu thành công.
      // console.log(`>>>>> Kết nối thành công tới ${email}`);
      var dataforQR_code = {
        email: email,
        phone_number: phone_number
      };
      transporter.sendMail(
        {
          from: "homelesshacker2060@gmail.com",
          to: email,
          subject: `UNIT GỬI VÉ MỜI QR CODE CHO BẠN`,
          // text: `Xin chào ${full_name.toUpperCase()}   Đây là QR code dùng để check in của bạn, khi đi vui lòng mang theo để check in, xin cảm ơn ${code}`,
          // html: `Xin chào <h1>${full_name.toUpperCase()}</h1><img src="https://i.imgur.com/HTxyz4T.png" alt="Smiley face" height="42" width="42"><p>Đây là QR code dùng để check in của bạn, khi đi vui lòng mang theo để check in, xin cảm ơn</b><ul><li>Username:` + `tom` + `</li><li>Email:` + email + `</li><li>Username:` + phone_number + `</li></ul>`,
          html: `
                <html>
                <head>
                    <title>Testing QR code</title>
                    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
                    <script type="text/javascript">
                        function generateBarCode()
                        {
                            var nric = $('#text').val();
                            var url = 'https://api.qrserver.com/v1/create-qr-code/?data=' + nric + '&amp;size=50x50';
                            $('#barcode').attr('src', url);
                        }
                    </script>
                </head>
                <body>
                    <p>Xin chào <b>${full_name.toUpperCase()}</b>. Chúc mừng bạn đã đăng kí tham dự hội thảo ABC thành công, đây là QR code dùng để check in của bạn, khi đi vui lòng mang theo để check in, xin cảm ơn.</p><br><br>
                    <div style="border: 2px solid black;">
                    <h4 style=" text-align:center">VÉ MỜI</h4>
                    <img style=" margin-left: 85px;"
                        id='barcode' 
                        src=https://api.qrserver.com/v1/create-qr-code/?data=${JSON.stringify(
                          dataforQR_code
                        )}&amp;size=300x300" 
                        alt="QR code" 
                        title="QR code" 
                        width="150" 
                        height="150" 
                    />
                        <h4 style="text-align:center">SCAN NOW</h4>
                        </div>

                </body>
                </html>`
          // attachments: [
          //     {
          //         path: ABSPATH + '/logo.png'
          //     }
          // ]
        },
        (error, info) => {
          if (error) {
            console.log(">>> error");
          } else {
            console.log(`>>> gửi mail thành công cho ${email}`);
          }
        }
      );
    }
  });

  //
});
// gửi mail hàng loạt
app.post("/students_mail", (req, res) => {
  const { id, email, full_name, phone_number, updateBy } = req.body;
  students
    .update(
      {
        email: email,
        full_name: full_name,
        phone_number: phone_number,
        updateBy: updateBy
      },
      {
        where: { id: id }
      }
    )
    .then(row => res.json({ kq: 1, row: row[0] }))
    .catch(err => res.json({ kq: 0 }));

  // gửi mail
  transporter.verify(function(error, success) {
    // Nếu có lỗi.
    if (error) {
      console.log(error);
    } else {
      //Nếu thành công.
      // console.log(`>>>>> Kết nối thành công tới ${email}`);

      transporter.sendMail(
        {
          from: "homelesshacker2060@gmail.com",
          to: email,
          subject: `UNIT GỬI VÉ MỜI QR CODE CHO BẠN`,
          html: `
                <html>
                <head>
                    <title>Testing QR code</title>
                    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
                    <script type="text/javascript">
                        function generateBarCode()
                        {
                            var nric = $('#text').val();
                            var url = 'https://api.qrserver.com/v1/create-qr-code/?data=' + nric + '&amp;size=50x50';
                            $('#barcode').attr('src', url);
                        }
                    </script>
                </head>
                <body>
                    <p>Xin chào <b>${full_name}</b>. Chúc mừng bạn đã đăng kí tham dự hội thảo ABC thành công, đây là QR code dùng để check in của bạn, khi đi vui lòng mang theo để check in, xin cảm ơn.</p><br><br>
                    <div style="border: 2px solid black;">
                    <h4 style=" text-align:center">VÉ MỜI</h4>
                    <img style=" margin-left: 85px;"
                        id='barcode' 
                        src=https://api.qrserver.com/v1/create-qr-code/?data=${email}${phone_number}&amp;size=300x300" 
                        alt="QR code" 
                        title="QR code" 
                        width="150" 
                        height="150" 
                    />
                        <h4 style="text-align:center">SCAN NOW</h4>
                        </div>

                </body>
                </html>`
        },
        (error, info) => {
          if (error) {
            console.log(">>> error");
          } else {
            console.log(`>>> đã gửi mail cho học sinh ${email}`);
          }
        }
      );
    }
  });

  //
});
// update students
app.post("/students_update", (req, res) => {
  const {
    id,
    email,
    full_name,
    phone_number,
    address,
    attended,
    createBy,
    updateBy,
    is_delete
  } = req.body;
  students
    .update(
      {
        id: id,
        email: email,
        full_name: full_name,
        phone_number: phone_number,
        address: address,
        attended: attended,
        createBy: createBy,
        updateBy: updateBy,
        is_delete: is_delete
      },
      {
        where: { id: id }
      }
    )
    .then(row => res.json({ kq: 1, row: row[0] }))
    .catch(err => res.json({ kq: 0 }));
});
// delete students
app.post("/students_delete", (req, res) => {
  const {
    id,
    email,
    full_name,
    phone_number,
    address,
    attended,
    createBy,
    updateBy,
    is_delete
  } = req.body;
  students
    .update(
      {
        id: id,
        email: email,
        full_name: full_name,
        phone_number: phone_number,
        address: address,
        attended: attended,
        createBy: createBy,
        updateBy: updateBy,
        is_delete: true
      },
      {
        where: { id: id }
      }
    )
    .then(row => res.json({ kq: 1, row: row[0] }))
    .catch(err => res.json({ kq: 0 }));
});

// test gg api
app.get("/gg_read", (req, res) => {
  const fs = require("fs");
  const readline = require("readline");
  const { google } = require("googleapis");

  // If modifying these scopes, delete token.json.
  const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
  // The file token.json stores the user's access and refresh tokens, and is
  // created automatically when the authorization flow completes for the first
  // time.
  const TOKEN_PATH = "token.json";

  // Load client secrets from a local file.
  fs.readFile("credentials.json", (err, content) => {
    if (err) return console.log("Error loading client secret file:", err);
    // Authorize a client with credentials, then call the Google Sheets API.
    authorize(JSON.parse(content), listMajors);
  });

  /**
   * Create an OAuth2 client with the given credentials, and then execute the
   * given callback function.
   * @param {Object} credentials The authorization client credentials.
   * @param {function} callback The callback to call with the authorized client.
   */
  function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getNewToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    });
  }

  /**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
   * @param {getEventsCallback} callback The callback for the authorized client.
   */
  function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES
    });
    console.log("Authorize this app by visiting this url:", authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question("Enter the code from that page here: ", code => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err)
          return console.error(
            "Error while trying to retrieve access token",
            err
          );
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
          if (err) return console.error(err);
          console.log("Token stored to", TOKEN_PATH);
        });
        callback(oAuth2Client);
      });
    });
  }

  /**
   * Prints the names and majors of students in a sample spreadsheet:
   * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
   * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
   */
  function listMajors(auth) {
    const sheets = google.sheets({ version: "v4", auth });
    sheets.spreadsheets.values
      .get({
        spreadsheetId: "1k87iTq0Z8A8cS8XE9ArgvC1vrORAc9cYK8dQdAUz9Ko",
        range: "A2:E100"
      })
      .then(rows => res.json({ kq: 1, rows: rows.data }))
      .catch(err => res.json({ kq: 0 }));
  }
});
