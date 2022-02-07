const express = require('express');
const mongoose = require('mongoose');
const resRouter = require('./routes/RestaurantRoutes.js');

const app = express();
app.use(express.json()); 


mongoose.connect('mongodb+srv://Mina:Mina13@comp3123.2pj6o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(success => {
  console.log('Success Mongodb connection')
}).catch(err => {
  console.log('Error Mongodb connection')
});

app.use(resRouter);

app.listen(8081, () => { console.log('Server is running...') });
