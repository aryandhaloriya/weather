const express =  require("express");
const { ftruncateSync } = require("fs");
const https = require("https");
const bodyParser = require("body-parser");
const { writeHeapSnapshot } = require("v8");
const { request } = require("http");
const app = express();
 app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req,res){
     res.sendFile (__dirname + "/index.html");
    
});
app.post("/", function(req,res){
    const query = req.body.cityName;
    const apiKey = "12ac2a71a940bc9943cd8f15f3ab7dce" ;
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url , function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
           const weatherData = JSON.parse(data)
          const temp = weatherData.main.temp
          const weatherDescription = weatherData.weather[0].description
          const icon = weatherData.weather[0].icon
          const imageURL = " http://openweathermap.org/img/wn/" + icon + "@2x.png"
          res.write("<p>the wether is currently " +  weatherDescription + "</p>");
          res.write(" <h1>The temprature in " + query +" is " + temp + "degree celcius.</h1>");
          res.write("<img src=" + imageURL +">");
          res.send()

        });
    });
})



app.listen(3000,function(){
    console.log("server 3000 is live");
});