const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let studentSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  course: {
    type: String
  },
  address:{
    type: String
  },
  password:{
      type:String
  },
  gender:{
    type: String
  },
  
  role :{
    type:String
  }
}, {
    collection: 'students'
  })

module.exports = mongoose.model('Student', studentSchema)