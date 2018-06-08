var express = require('express');
var compression = require('compression');
var engines = require('consolidate');
var bodyParser = require('body-parser');

// Service
var app = express();
var randomstring = require("randomstring");;

app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.use(express.static("public"));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(compression());

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

app.use(allowCrossDomain);

app.get('/', function (request,response) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    response.redirect("/Wisdom/");
});


console.log("Preparing to start server");
app.listen(process.env.PORT || 3000, function(){
   console.log('Picolabs api up and running in port http://localhost:3000/..');
});




