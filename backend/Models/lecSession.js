const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let lecSession = new Schema({
    classId: {
    type: String
  },
   lecDate:{
    type:[String]
  },

  lecTime:{
    type:[String]
  },
  subejct:{

    type: String
  },

  department:{

    type: String
  },
  
  enroll:{
   type:[String]
  },

  lecturerID :{

    type: String
  }


}, {
    collection: 'lecSession'
  })

module.exports = mongoose.model('lecSession', lecSession)