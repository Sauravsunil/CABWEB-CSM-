const { request } = require('express');
const db = require('../models/customer');

module.exports = async (req, res, next) => {
    req.identity = {
        isAuthenticated: false,
        db: null    
    }
    if(req.url == "/api/login" || req.url == "/api/register" || req.url=="/api/home"){
        return next();
    }
     
    let userId = req.session.passenger_id;
   
    if(!userId || userId == null){
        return res.redirect("/api/login");
    }

    let userFromDb = await db.findByPk(userId);
   
    if(userFromDb == null){
        return res.redirect("/api/login");
    }
    

    req.identity.isAuthenticated = true;
    req.identity.db = {
        passenger_id: userFromDb.dataValues.passenger_id,
        role: 'user'
    }
   
    
    next();

}