const {users} = require('../models/index');
const uuid = require('uuid');
const TokenGenerator = require('uuid-token-generator');


const signUp = (userid,email,firstName,lastName,contact,password) =>{
    //create a User object
    let uuidGenerated = `${uuid.v1()}`;
    const tokGen = new TokenGenerator();
    let tokenGenerated = tokGen.generate();
    let userObj = {
        userid : userid,
        email : email,
        first_name : firstName,
        last_name : lastName,
        username : firstName+lastName,
        contact : contact,
        password : password,
        isLoggedIn : false,
        uuid : uuidGenerated,
        accesstoken : tokenGenerated
    }

    const newUser = new users(userObj);
    return newUser.save()
}

//check for successful login
const login = (username,password) => {
    return users.find({username : username, password : password});
}

//check for successful logout
const logout = (userid) => {
    users.findOneAndUpdate({userid : userid},
                            {isLoggedIn : false})
}

//code for getting coupens
const getCouponCode = (userid) => {
    users.find({userid : userid},{coupens : 1})
}

//code for updating the shows
const bookShow = (userid,referencenumber,couponCode,showid,tickets) => {
    users.findOneAndUpdate({userid : userid},
        {reference_number : referencenumber,
        coupon_code : couponCode,
        show_id : showid,
        tickets : JSON.parse(tickets)
    })
}

module.exports = {signUp,login,logout,getCouponCode,bookShow};