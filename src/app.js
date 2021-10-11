const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express();
const public = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");


app.use(express.static(public))


app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

app.get('/', (req, res)=> {
    res.render('index', {
        title:"Weather App",
        name:"Natalia Shelley"
    })
})
app.get('/about', (req, res)=> {
    res.render('about', {
        title:"About",
        name:"Natalia Shelley"
    })
})
app.get('/help', (req, res)=> {
    res.render('help', {
        title:"Help",
        name:"Natalia Shelley"
    })
})

app.get("/weather", (req, res)=> {
console.log(req.query)
    if(req.query && req.query.address !== "") {

        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({error})
            }
    
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({error})
                }
    
                res.send({forcast:forecastData,location, address:req.query.address})
            })
        })
    } else {
        res.send("<p>Please, provide the address</p>")
    }
    
})
app.get('/help/*', (req, res)=> {
    res.render('404', {
        message:"Help article not found",
        title:"Help Title for HBS File",
        name:"Natalia Shelley"
    })
})

app.get('*', (req, res)=> {
    res.render('404', {
        message:"404 not found",
        title:"Help Title for HBS File",
        name:"Natalia Shelley"
    })
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})