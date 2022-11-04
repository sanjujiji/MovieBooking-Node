const mongoose = require('mongoose');
// const moviesSchema = require ('./movie.model');

const userSchema = mongoose.Schema({
    userid : {
        type : Number
    },
    email : {
        type : String
    },
    first_name : {
        type : String
    },
    last_name : {
        type : String
    },
    username : {
        type : String
    },
    contact : {
        type : String
    },
    password : {
        type : String
    },
    role : {
        type : String
    },
    isLoggedIn : {
        type : Boolean
    },
    uuid : {
        type : String
    },
    accesstoken : {
        type : String
    },
    coupens :[
        {
            id : {
                type : Number
            },
            discountValue : {
                type : Number
            }
        }
    ],
    bookingRequests :[{
        reference_number :{
            type : Number
        },
        coupon_code : {
            type : Number
        },
        show_id : {
            type : [Number]
        },
        tickets : [
            {
                type : Number
            }
        ]
    }]
});

module.exports = userSchema;