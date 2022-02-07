
const mongoose = require('mongoose');
const RestaurantSchema = new mongoose.Schema(
    {
        address:{     
            building: {
                type: String,
                 required: [true, "Enter the address number"],
                 trim: true,
            },
            street: {
                type: String,
                 required: [true, "Enter the street name"],
                 trim: true,
                 lowercase: true
            },
            zipcode: {
                type: String,
                 required: [true, "Enter the zipcode"],
                 trim: true
            }
        },
        city: {
            type: String,
             required: [true, "Enter the city"],
             lowercase: true,
             trim: true,
        },
        cuisine: {
            type: String,
             required: [true, "Enter the cuisine"],
             trim: true,
        },
        name: {
            type: String,
             required: [true, "Enter the name"],
             lowercase: true,
             trim: true,
        },
        restaurant_id: {
            type: String,
            required: [true, "Enter the restaurant id"],
            unique: [true, "restaurant id must be unique"],
            lowercase: true,
            trim: true,
            validate(value) {
                if (isNaN(value)) {
                    throw new Error("Restaurant id should be an integer")
                }
            }
        }
    }, 
    
    {collection: 'Restaurants'} 
)

RestaurantSchema.pre('save', (next) => {
  console.log("Before Save")
  let now = Date.now()

  this.updatedat = now
 
  if (!this.created) {
    this.created = now
  }
  
  next()
});

RestaurantSchema.pre('findOneAndUpdate', (next) => {
  console.log("Before findOneAndUpdate")
  let now = Date.now()
  this.updatedat = now
  console.log(this.updatedat)
  next()
});

 RestaurantSchema.post('init', (doc) => console.log(`item number ${doc._id} was initialized`))
 RestaurantSchema.post('validate', (doc) => console.log(`item number ${doc._id} was validated`))
 RestaurantSchema.post('saved', (doc) => console.log(`item number ${doc._id} was saved`))
 RestaurantSchema.post('remove', (doc) => console.log(`item number ${doc._id} was removed`))


const Restaurants = mongoose.model("Restaurants", RestaurantSchema)
module.exports = Restaurants