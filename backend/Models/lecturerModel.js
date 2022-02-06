const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let lecturer = new Schema({
  name: {
    type: String
  },
   email:{
    type: String
  },

  department:{
    type: String
  },
  subejct:{

    type: String
  },
  gender:{
    type: String
  },
  password:{
    type: String
  },
  
  role:{
    type: String
   
  }


}, {
    collection: 'lecturer'
  })

module.exports = mongoose.model('lecturer', lecturer)