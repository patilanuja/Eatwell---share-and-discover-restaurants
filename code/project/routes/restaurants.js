const express = require('express')
const router = express.Router()

const fs = require('fs')
const uuid = require('uuid')
const resData = require('../util/restaurant-data.js')

router.get('/restaurants', function(req,res){
    const storedRestuarant = resData.getStoredRestaurants()

    storedRestuarant.sort(function(resA, resB){
        if (resA.name > resB.name){
            return 1
        }
        return -1

    })
    res.render('restaurants', {numberOfRestaurants: storedRestuarant.length, restaurants: storedRestuarant})
})

router.get('/restaurants/:id', function(req, res){
    const restauarntId = req.params.id
    const storedRestuarant = resData.getStoredRestaurants()

    for (const restauarant of storedRestuarant){
        if (restauarant.id === restauarntId){
            return res.render('restaurant-details', {restaurant:restauarant })

        }
    }
    res.status(404).render('404')
})

router.get('/recommend', function(req,res){
    res.render('recommend')
})

router.post('/recommend', function(req,res){
    const restauarnt = req.body
    restauarnt.id = uuid.v4()
    const restuarants = resData.getStoredRestaurants()
    restuarants.push(restauarnt)
    resData.storeRestuarants(restuarants)
    res.redirect('/confirm')
})  


router.get('/confirm', function(req,res){
    res.render('confirm')
})

module.exports = router