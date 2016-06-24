/*
Created 6/22/16. License: Affero GPL.

This page handles two functions.
1. Getting data from a Google Spreadsheet, as a result of a Google Form Submit.
2. Updating the relevant "People" object in NationBuilder.

Not sure where in the website chain to put this when complete, so I'm only working on the
necessary utility functions.
 */

function handle_request() {
  // REDIRECT TO auth_url IF YOU DO NOT HAVE AN ACCESS TOKEN
  // DETERMINE WHICH SHEET TO GET - HARDCODED HERE?
  // GET DATA FROM SHEET AND APPLY INFORMATION TO NATIONBUILDER
}


var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

function get_auth_url() { // generate a url that asks permissions for Google Sheets
  var scopes = [
    'https://www.googleapis.com/auth/sheets'
  ];
  var auth_url = oauth2Client.generateAuthUrl({
    access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
    scope: scopes // If you only need one scope you can pass it as string
  });
}
function get_token() {
  oauth2Client.getToken(code, function (err, tokens) {
    // Now tokens contains an access_token and an optional refresh_token. Save them.
    if (!err) {
      oauth2Client.setCredentials(tokens);
    }
  });
}
function getSheet() {
  var sheets = google.sheets({ version: 'v3', auth: oauth2Client });
  var sheet = sheets.spreadsheets.get({spreadsheetId: ''});
  var values = sheets.spreadsheets.values.get({spreadsheetId: '', range: ''});
}

function create_or_update_person(person) {
  var request = require('request');
  request.get({
    url: 'http://nationbuilder.com/api/v1/people/search',
    body: "first_name="+person["first_name"]+"last_name="+person["last_name"]
  }, function(error, response, body){
    result = JSON.parse(body);
    if (result["results"].size == 0) {
      create_person(person);
    } else {
      var id = result["results"][0]["id"];
      update_person(id,person);
    }
  });
}
function create_person(person) {
  var request = require('request');
  var data = {"person": person}
  request.post({
    url: 'http://nationbuilder.com/api/v1/people',
    body: JSON.stringify(data)
  }, function(error, response, body){
    console.log(body);
  });
}
function update_person(id,person) {
  var request = require('request');
  var data = {"person": person}
  request.put({
    url: 'http://nationbuilder.com/api/v1/people/'+id,
    body: JSON.stringify(data)
  }, function(error, response, body){
    console.log(body);
  });
}
function tag_person(id,tags) {
  var request = require('request');
  var data = {"tagging": tags};
  request.put({
    url: 'http://nationbuilder.com/api/v1/people/'+id+'/taggings',
    body: JSON.stringify(data)
  }, function(error, response, body){
    console.log(body);
  });
}
