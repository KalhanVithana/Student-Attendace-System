const { Timeline } = require('antd');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {ObjectId} = mongoose.Schema.Types

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

  courseName:{

    type: String
  },
  
  enroll:{
   type:[String]
  },

  lecturerID :{

    type: String
  },
  attendance :{
            type:[Array],
            timestamps: true               
  },
  enableCourse :{
    type: Boolean,
    default:0
  }


}, {
    collection: 'lecSession'
  })

module.exports = mongoose.model('lecSession', lecSession)