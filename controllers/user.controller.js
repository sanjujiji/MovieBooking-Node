const {users} = require('../models/index');
const uuid = require('uuid');
const TokenGenerator = require('uuid-token-generator');


const signUp =  async (email,firstName,lastName,mobileNumber,password) =>{
    //create a User object
    
    //take the highest value of userid in the collection and add one to it
    
    var maxId;
    try {
        await users.find({},{userid:1 , _id:0},(err,results) => {
        maxId = results;
        }).sort({"userid":-1}).limit(1).clone();
    
        maxId = maxId[0].userid + 1;
        let userObj = {
            userid : maxId,
            email : email,
            first_name : firstName,
            last_name : lastName,
            username : firstName+lastName,
            contact : mobileNumber,
            password : password,
            isLoggedIn : false,
            uuid : "",
            accesstoken : ""
        }
    
        const newUser = new users(userObj);
        return newUser.save();
    }
        catch(error){
            console.log(error);
    }
}

//check for successful login
const login = async (username,password) => {
    var uuidGenerated, tokenGenerated;
    try{
    await users.find({username : username, password : password},  async (err,results) => {
        if (results.length > 0){
            uuidGenerated = `${uuid.v1()}`;
            const tokGen = new TokenGenerator();
            tokenGenerated = tokGen.generate();
            await users.findOneAndUpdate({username:username},
                                   {$set:{uuid : uuidGenerated,
                                    accesstoken : tokenGenerated,
                                    isLoggedIn : true}},(err,results) =>{
                                        console.log("");
                                    }).clone();
        }
    }).clone();
    return (uuidGenerated +" " +tokenGenerated);
    }
    catch(error) {
        console.log(error);
    }
}

//check for successful logout
const logout = async (uuid) => {
    var documentReturned;
    try{
    await users.findOneAndUpdate({uuid : uuid},
                            {$set :{isLoggedIn : false}},(err,results) => {
                                documentReturned = results;
                            }).clone();
    return documentReturned;                        
    }        
    catch(error){
        console.log(error);
    }                
}

//code for getting coupens
const getCouponCode = async (accessToken,coupon) => {
    var couponVal = parseInt(coupon);
    console.log("accesstoken");
    console.log(accessToken);
    var discountRet;
    try {
    
        // Get just the docs that contain a shapes element where color is 'red'
        await users.aggregate([
            { $match : {accesstoken : accessToken ,"coupens.id": couponVal}},
            { $unwind : "$coupens" },
            { $match : {"coupens.id": couponVal }},
            { $project : {"coupens.discountValue":1,_id:0}}],(err,results) => {
                var discountObj = results;
                if(discountObj){
                var discountStr = JSON.stringify(discountObj);
                var jsonObj = JSON.parse(discountStr);
                discountRet = jsonObj[0].coupens;
                }
                else {
                    return {discountValue : 0};
                }
    });
    return discountRet;
}
catch(error){
    console.log(error);
} 
   
}

//code for updating the shows
const bookShow = async (customerUuid,token,coupon_code,show_id,tickets) => {
    var reference = Math.floor(Math.random() * 100000);
    var retVal;
    try {
    await users.findOneAndUpdate({uuid : customerUuid,accesstoken:token},
		{
		$push : {
			bookingRequests : {
				                reference_number : reference,
				                coupon_code : coupon_code,
				                show_id : show_id,
				                tickets : JSON.parse(tickets)}}},
		    {"bookingRequests.reference_number":1,_id:0,
            returnNewDocument:true},(err,results) => {
            if (results){
                retVal = reference;
        }
    }).clone();
    return JSON.stringify({reference_number : retVal});
}
    catch(error){
        console.log(error);
    }
}

module.exports = {signUp,login,logout,getCouponCode,bookShow};