const express = require('express')
const path = require('path')



const defaultRouters = require('./routes/default')
const restarantRouters = require('./routes/restaurants')

const app = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use('/', defaultRouters)
app.use('/', restarantRouters)

app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))


app.use(function(req, res){
    res.status(404).render('404')
})

app.use(function(error,req, res, next){
    res.status(404).render('500')
})

app.listen(3000)