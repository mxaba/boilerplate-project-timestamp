// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:date", (req, res) => {
  let dateTime;
  if(/^\d+$/.test(req.params.date)){
    dateTime = new Date(Number.parseInt(req.params.date));
  }else{
    dateTime = new Date(req.params.date);
  }
  if (dateTime.toString() !== 'Invalid Date') {
    res.json({unix: dateTime.getTime(), utc: dateTime.toUTCString()});
  } else {
    res.json({error: dateTime.toString()});
  }
});

app.get("/api", (req, res) => {
  const todayTime  = new Date();
  res.json({
    unix: todayTime.getTime(),
    utc: todayTime.toUTCString(),
  })
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});