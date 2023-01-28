// index.js
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


app.get("/api" , (req, res)=>{

  res.json({
    unix: new Date().getTime(),
    utc : new Date().toUTCString(),
  });

});

app.get("/api/:var" , (req , res) =>{
  const time = req.params.var;
  if(!isNaN(Number(time)) && time.length === 13)
  {
    return res.json({
      unix: parseInt(time),
      utc: new Date(Number(time)).toUTCString(),
    })
  }
  console.log(new Date(time));


  if(new Date(time) != 'Invalid Date')

  {
    return res.json({
      unix: new Date(time).getTime(),
      utc: new Date(time).toUTCString(),
    })
  }

  res.json({
    error : 'Invalid Date'
  })

})


function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}


// listen for requests :)
var listener = app.listen(4000, function () {
  console.log('Your app is listening on port ' + 4000);
});
