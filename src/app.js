const express = require('express');
const hbs = require('hbs');
const path = require('path');
const http = require('http');
const app = express();
const weatherData = require('../utils/weatherData');
const PORT = process.env.PORT || 3000

const publicStaticDirPath =path.join(__dirname, '../public');

const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath));

const Server = http.createServer()

console.log('Hellooo there');

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather App'
    });
  });

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if(!address){
        res.send({
            error: 'You must enter an address'  
        });
    }
    weatherData(address , (error, {temperature, description, cityName} = {}) => {
        if(error){
            return res.send({
                error
            });
        }    
        console.log(temperature, description,cityName);
        res.send({
            temperature,
            description,
            cityName
        });
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found'
});

});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
