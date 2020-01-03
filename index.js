var express = require("express");
const bodyParser = require("body-parser");
var app = express();
const { accounts } = require("./db.js"); // connect database
const { transporter } = require("./main"); //  email setting

var server = require("http").Server(app);
server.listen(process.env.PORT || 3000, () => console.log(">>> server run port 3000")); 
app.use(require("body-parser").json()); // allow input json type
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("xin chao ban dang truy cap server"));
("use strict");
const nodemailer = require("nodemailer"); // pakage support mailing
const path = require("path");
const ABSPATH = path.dirname(process.mainModule.filename); // Absolute path to our app directory

// get list accounts
app.get("/accounts_read", (req, res) => {
  accounts
    .findAll()
    .then(accounts => res.json({ status: 200, accounts: accounts }))
    .catch(err => res.json({ status: 202 }));
});

// add accounts
app.post("/accounts_add", (req, res) => {
  accounts
    .create({
      email: req.body.email,
      password: req.body.password,
      full_name: req.body.full_name,
      birthday: req.body.birthday
    })
    .then(() => res.json({ status: 200 }))
    .catch(err => res.json({ status: 202 }));
});

// update accounts
app.post("/accounts_update", (req, res) => {
  accounts
    .update(
      {
        id: req.body.id,
        email: req.body.email,
        password: req.body.password,
        full_name: req.body.full_name,
        birthday: req.body.birthday
      },
      {
        where: { id: req.body.id }
      }
    )
    .then(row => res.json({ status: 200, row: row[0] }))
    .catch(err => res.json({ status: 202 }));
});

// delete accounts
app.delete('/accounts_delete', function (req, res) {
  accounts
    
    .destroy({
      where: { id: req.params.id }
    })
    .then(function (rowDeleted) { // rowDeleted will return number of rows deleted
      if (rowDeleted === 1) {
        return res.status(200);
      }
    }, function (err) {
      return res.status(202);
    });

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
      .then(rows => res.json({ status: 200, rows: rows.data }))
      .catch(err => res.json({ status: 202 }));
  }
});
