const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//define paths to express configs
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'andrew mead'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me',
        name: 'andrew mead'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'help me please',
        title: 'help',
        name: 'andrew mead'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you have to provide an address'
        });
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if(error) {
            return res.send({
                error
            });
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error
                });
            }
    
            res.send({
                address: req.query.address,
                location,
                forecast: forecastData
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        });
    }
    console.log(req.query);
    res.send({
        products: []
    });
});

app.get('/help/*', (req,res) => {
    res.render('404', {
        errMessage: 'help article not found',
        title: '404 page',
        name: 'andrew mead'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        errMessage: 'page not found',
        title: '404 page',
        name: 'andrew mead'
    });
});

app.listen(3000, () => {
    console.log('server is up on port 3000');
});