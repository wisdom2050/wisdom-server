var express = require('express');
var engines = require('consolidate');
var MongoClient = require('mongodb').MongoClient;
var app = express();
var assert= require('assert');
app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/test', function(request, response){
    response.send("Hola wisdom this is the first one service !!You are welcome!!-?");
});

MongoClient.connect(
    "mongodb://heroku_1kp0t4cl:sh9koecdrat54rt0uihcg1a81e@ds011268.mlab.com:11268/heroku_1kp0t4cl",
    function(error, db) {
        assert.equal(error, null);
        console.log("Success Connection to mongo db");
        app.post('/wisdom/register', function(request, response){
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

