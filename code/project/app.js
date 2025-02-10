const express = require('express')
const path = require('path')
const fs = require('fs')



const app = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))

app.get('/', function(req,res){
    res.render('index');
})

app.get('/about', function(req,res){
    res.render('about')
})

app.get('/recommend', function(req,res){
    res.render('recommend')
})

app.post('/recommend', function(req,res){
    const restauarnt = req.body
    const filePath = path.join(__dirname, 'data', 'restaurants.json')

    const fileData = fs.readFileSync(filePath)

    const storedRestuarant = JSON.parse(fileData)

    storedRestuarant.push(restauarnt)

    fs.writeFileSync(filePath, JSON.stringify(storedRestuarant))

    res.redirect('/confirm')
})


app.get('/restaurants', function(req,res){
    const filePath = path.join(__dirname, 'data', 'restaurants.json')

    const fileData = fs.readFileSync(filePath)

    const storedRestuarant = JSON.parse(fileData)
    res.render('restaurants', {numberOfRestaurants: storedRestuarant.length, restaurants: storedRestuarant})
})

app.get('/confirm', function(req,res){
    res.render('confirm')
})





app.listen(3000)