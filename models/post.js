const { default: mongoose } = require("mongoose");

const mongoose = reuire('mongoose');


const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        types: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    },{
        timesStamps: true
    
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;