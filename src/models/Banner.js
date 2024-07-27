const mongoose = require('mongoose');

const bannerSchema = mongoose.Schema({
    name:{
        type:String
    },
    img:[{
        type:String
    }]
})

module.exports = mongoose.model('banner',bannerSchema);