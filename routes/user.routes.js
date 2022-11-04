const express = require('express');
const router = express.Router();


const {signUp,login,logout,getCouponCode,bookShow} = require('../controllers/user.controller');
//route for signup
router.post('/auth/signup',(request,response) => {
    const  {userid,email,firstName,lastName,contact,password} = req.body;
    signUp(userid,email,firstName,lastName,contact,password)
    .then((document) => {
        response.status(200).send(document);
        response.end();
    })
    .catch((err) => {
        response.status(422).send(err);
        response.end();
    })
});

router.post('/auth/login',(request,response) => {
    const  {username,password} = req.body;
    login(username,password)
    .then((document) => {
        if (document.length > 0){
            response.status(200).send("Login Successful!");
            response.end();
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
        const  {userid} = req.body;
        logout(userid)
        .then((document) => {
            if (document.length > 0){
                response.status(200).send("Logout Successful!");
                response.end();
            }
            else {
                response.status(422).send("Logout Unsuccessful!");
                response.end();
            }
        })
        .catch((err) => {
            response.status(422).send("Logout Unsuccessful!");
            response.end();
        })
})

    router.get('/getCouponCode',(request,response) => {
    getCouponCode(req.params.userid)
    .then((document) => {
        response.status(200).send(document);
        response.end();
    })
    .catch((err) =>{
        response.status(422).send("Unable to process request");
        response.end();
    })
})

//code for updating the show details
router.post('/bookShow',(request,response) => {
    const  {userid,referencenumber,couponCode,showid,tickets} = req.body;
    bookShow(userid,referencenumber,couponCode,showid,tickets)
    .then((document) => {
        if (document.length > 0){
            response.status(200).send("Show details updated successfully!");
            response.end();
        }
        else {
            response.status(422).send("Show details update Unsuccessful!");
            response.end();
        }
    })
    .catch((err) => {
        response.status(422).send("Show details update Unsuccessful!");
        response.end();
    })
})

module.exports = router;

