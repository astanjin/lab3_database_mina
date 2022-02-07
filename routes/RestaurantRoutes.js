
const express = require('express');
const RestaurantModel = require('../models/Restaurant.js');
const app = express();

app.post('/restaurant', async (req, res) => {
  
    console.log(req.body)
    const restaurant = new RestaurantModel(req.body);
    
    try {
      await restaurant.save((err) => {
        if(err){
     
          res.send(err)
        }else{
          res.send(res);
        }
      });
    } catch (err) {
      res.status(500).send(err);
    }
  });

app.get('/restaurants', async (req, res) => {
    let restaurant
    if(req.query.sortBy){
        restaurant = await RestaurantModel
            .find({})
            .select("cuisine name city restaurant_id")
            .sort({ restaurant_id: req.query.sortBy })
    }
    else{
        restaurant = await RestaurantModel.find({})
    }

    try {
        res.send(restaurant);
    } 
    catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
});

app.get('/restaurants/cuisine/:type', async (req, res) => {
    const restaurant = await RestaurantModel.find({ cuisine: req.params.type});

    try { res.send(restaurant) }
    catch (err) { res.status(500).send(err) }
});



app.get('/restaurants/Delicatessen', async (req, res)=>{
    const results = await RestaurantModel
        .find({ cuisine: 'Delicatessen', city: { $ne: "Brooklyn"} })
        .select("cuisine name city -_id")

    try {res.send(results)}
    catch (err) { res.status(500).send(err)}
})

module.exports = app




