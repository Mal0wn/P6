const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    description : {type: String, required: true },
    mainingredient: {type: String, required: true},
    imageUrl: {type: String, required: true },
    heat: {type: Number, required: true},
    likes: {type: Number, default: 0},
    dislikes: {type : Number, default: 0},
    userlikes: {type : [String], },
    usersdisliked: {type : [String], },
    
    
});

module.exports = mongoose.model('sauce', sauceSchema);