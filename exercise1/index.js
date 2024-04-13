var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  

app.use(express.static('public'));


app.get("/", function (_req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date", function (req, res) {
  let dateObj = new Date(unixTimestamp * 1000);
  let utcString = dateObj.toUTCString();
  res.json({ unix: req.params.date, utc: utcString });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
