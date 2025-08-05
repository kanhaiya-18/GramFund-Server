const mongoose = require("mongoose");

const fundSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique:true
    },
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        default: "-"
    },
    status: {
        type: String,
        enum: ["pending", "used"],
        default: "pending",
        
        required: true,
    },
    image:{
        type:[String],//array of urls
        default:[]
    }
},
    {
        timestamps: true
    }
);
module.exports = mongoose.model("fund",fundSchema);