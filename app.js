const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function (req, res){
 res.sendFile(__dirname + "/index.html");

   
})

app.post("/", function(req, res){
    
    const query = req.body.cityName; // takes input from form to use with API and get city for weather
    const apiKey = "5314e371367e929bef433b88f2766f15";
    const unit = "imperial"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const description = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon

            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            console.log(temp, description);
            res.write("<p> The weather is currently " + description + "</p>");
            res.write("<h1> The temperature in "+ query +" is " + temp + " degrees. </h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();
    })
});

    
})



app.listen(3000, function (){
    console.log("The server is running on port 3000.")
});
