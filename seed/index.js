require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User')
// Import the model
const user = [
  {
    email: "antonio@gmail.com",
    hashedPassword: "$2a$10$oVGx/xa4NnrHTGUtP2aKN.KiBgaEFw6oxsiDVFwsTiTMAhtwfEOca",
    username: "Antonio",  
    role: "user",
    imageProfile: "https://res.cloudinary.com/drjcv2pcj/image/upload/v1663079300/funRide/…"
  },
  {
    email: "admin@admin.com",
    hashedPassword: "$2a$10$7AlPw/d6knZpr3ySo0JhDeE22FeLzD1S5PgAtzuAhwSBbE81urncq",
    username: "Admin",  
    role: "admin",
    imageProfile: ""
  },

]

// Place the array you want to seed

mongoose.connect(process.env.MONGO_URL)
  .then(x => console.log(`Connected to ${x.connection.name}`))
  .then(() => {
    return User.create(user)
  })
  .then(() => {
    console.log('Seed done 🌱');
  })
  .catch(e => console.log(e))
  .finally(() => {
    console.log('Closing connection');
    mongoose.connection.close();
  })

// Run npm run seed 