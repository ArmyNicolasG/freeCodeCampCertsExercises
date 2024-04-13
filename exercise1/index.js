var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  

app.use(express.static('public'));


app.get("/", function (_req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", (req, res) => { // Exercise 1.
  const dateParam = req.params.date; 
  let dateObject; 
  if (!req.params.date) dateObject = new Date();
  else if (/\d{5,}/.test(req.params.date)) dateObject = new Date(parseInt(req.params.date)); 
  else dateObject = new Date(dateParam); 
  if (isNaN(dateObject)) return res.json({ error: "Invalid Date" });
  else return res.json({unix: dateObject.getTime(), utc: dateObject.toUTCString()});
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
