const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '..', 'data', 'restaurants.json') 

function getStoredRestaurants(){
    const fileData = fs.readFileSync(filePath)
    const storedRestuarant = JSON.parse(fileData)

    return  storedRestuarant
    
}

function storeRestuarants(storableRestaurants){
    fs.writeFileSync(filePath, JSON.stringify(storableRestaurants))
}

module.exports = {
    getStoredRestaurants: getStoredRestaurants,
    storedRestaurants: storeRestuarants
}