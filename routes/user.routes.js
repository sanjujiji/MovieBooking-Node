const express = require('express');
const router = express.Router();



const {signUp,login,logout,getCouponCode,bookShow} = require('../controllers/user.controller');
//route for signup
router.post('/auth/signup',(request,response) => {
    const  email  = request.body.email_address;
    const firstName = request.body.first_name;
    const lastName = request.body.last_name;
    const mobileNumber = request.body.mobile_number;
    const password = request.body.password;
    signUp(email,firstName,lastName,mobileNumber,password)
    .then((document) => {
        response.status(200).send(document);
        response.end();
    })
    .catch((err) => {
        response.status(422).send(err);
        response.end();
    })
});

router.post('/auth/login', (request,response) => {
    var token = request.headers['authorization'].split(/\s+/).pop()||'';
    var auth = Buffer.from(token, 'base64').toString();    // convert from base64
    var parts = auth.split(/:/);                          // split on colon
    var username1 = parts[0];
    var password1 = parts[1];
    var messageObj;
    login(username1,password1)
    .then((document) => {
        if (document){
            var uuid = document.substring(0,document.indexOf(" "));
            var token = document.substring(document.indexOf(" ")+1);
            messageObj = {"id" : uuid,
            "access-token": token};
            return response.end(JSON.stringify(messageObj));
            // response.end();
        }
        else {
            response.status(422).send("Login Unsuccessful!");
            response.end();
        }
    })
    .catch((err) => {
        response.status(422).send("Login Unsuccessful!");
        response.end();
    })
});

    router.post('/auth/logout',(request,response) => {
        logout(request.body.uuid)
        .then((document) => {
            if (document){
                const messageObj = {
                    message : "Logged Out successfully."
                }
                return response.end(JSON.stringify(messageObj));
            }
            else {
                return response.status(422).json("Logout Unsuccessful!");
                //response.end();
            }
        })
        .catch((err) => {
            response.status(422).send("Logout Unsuccessful!");
            response.end();
        })
})

    router.get('/auth/coupons',(request,response) => {
        var token = request.headers['authorization'].split(/\s+/).pop()||'';
        getCouponCode(token,request.query.code)
            .then((document) => {
            return response.end(JSON.stringify(document));
        })
        .catch((err) =>{
            return response.status(422).send("Unable to process request");
    })
})

//code for updating the show details
router.post('/auth/bookings',(request,response) => {
    var token = request.headers['authorization'].split(/\s+/).pop()||'';
    // const  {customerUuid,coupon_code,show_id,tickets} = request.body;
    const customerUuid = request.body.customerUuid;
    const coupon = request.body.bookingRequest.coupon_code;
    const showid = request.body.bookingRequest.show_id;
    const ticketList = request.body.bookingRequest.tickets;

    console.log (customerUuid,"---",coupon,"---",showid,"---",ticketList);
    bookShow(customerUuid,token,coupon,showid,ticketList)
    .then((document) => {
        if (document){
            const messageObj = {
                reference_number : document
            }
            return response.end(JSON.stringify(messageObj));
        }
        else {
            return response.status(422).send("Show details update Unsuccessful!");
            // response.end();
        }
    })
    .catch((err) => {
        response.status(422).send("Show details update Unsuccessful!");
        response.end();
    })
})

module.exports = router;

