var express = require('express');
var compression = require('compression');
var engines = require('consolidate');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var app = express();
var assert= require('assert');
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

app.get('/test', function(request, response){
    response.send("Hola wisdom this is the first one service !!You are welcome!!");
});

MongoClient.connect(
    process.env.MONGODB_URI,
    function(error, db) {
        assert.equal(error, null);
        console.log("Success Connection to mongo db");
        app.post('/test', function(request, response){
            var data = request.body;
            db.collection('users').insertOne(data, function (error, responseInsert) {
                if (error != null) {
                    if (error.name === 'MongoError') {
                        response.status(500).send(errorMessage(error.message, 400));
                    }
                } else {
                    var responseMessage =
                        {
                            "meta": {
                                "code": 201,
                                "msg": "User created"
                            },
                            "data":{
                                "_id" : responseInsert.insertedId
                            }
                        };
                    response.status(201).send(responseMessage);
                }
            });
        });
    });


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

function errorMessage ( message, code){
    var objectError =
        {
            "meta":{
                "code": code ,
                "msg" : message
            }
        };
    return objectError;
}

