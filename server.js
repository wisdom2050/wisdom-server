var express = require('express');
var engines = require('consolidate');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var app = express();
var assert= require('assert');

// Service
app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.use(express.static("public"));
app.use(bodyParser.json());


app.get('/', function (request,response) {
    response.header('Access-Control-Allow-Origin', 'http://www.wisdom.com.co');
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    response.redirect("/apidoc/");
});

app.get('/test', function(request, response){
    response.send("Hola wisdom this is the first one service !!You are welcome!!");
});

MongoClient.connect(
    "mongodb://heroku_1kp0t4cl:sh9koecdrat54rt0uihcg1a81e@ds011268.mlab.com:11268/heroku_1kp0t4cl",
    function(error, db) {
        assert.equal(error, null);
        console.log("Success Connection to mongo db");
        app.post('/wisdom/register', function(request, response){
            
            response.header('Access-Control-Allow-Origin', 'http://www.wisdom.com.co');
            response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
            response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
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

