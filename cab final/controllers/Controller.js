const db = require('../models/customer');
const db2 = require('../models/booking')
// const db3=require('../models/driver')
const db4 = require('../models/cab')
const auth = require('../middlewares/authenticationMiddleware')
const { body, validationResult } = require('express-validator');
const path = require('path');
const { where } = require('sequelize');
const { log } = require('console');

module.exports.showBooking = (req, res, next) => {

    db2.findAll({ where: { passenger_id: req.session.passenger_id } }).then(user => {
        res.render('booking-index', {
            data: user
        })
    })


}

module.exports.bookingDelete = (req, res, next) => {

    db2.destroy({

        where: { booking_id: req.params.booking_id }

    }
    ).then(user => {
        res.redirect('/api/user/booking')
    })
}

module.exports.home = function (req, res, next) {
    res.render('home')
}
module.exports.register = function (req, res, next) {
    res.render('register')
}
module.exports.booking = function (req, res, next) {

    res.render('booking')

}
module.exports.login = function (req, res, next) {
    res.render('login')
}
module.exports.registerPost = (req, res, next) => {


    db.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    })
        .then((user) => {
            res.redirect('login')

        }).catch((err) => {
            res.render('register', { message: "User already registered" })
        })
}

module.exports.bookingPost = (req, res, next) => {
    db2.create({
        Pickup: req.body.pickup,
        Destination: req.body.destination,
        passenger_id: req.session.passenger_id,
        Date: req.body.date,
        Time: req.body.time,
    })
        .then((user) => {
            // res.json(user);
            res.redirect('/api/payment')
            console.log("ok")
        })
}

module.exports.userUpdate = function (req, res, next) {

    res.render('user-update')

}

module.exports.userUpdatePost = (req, res, next) => {
    db.update({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    },
        {
            where: { passenger_id: req.session.passenger_id },
        }, { multi: true }
    ).then((user) => {
        res.redirect('/api/booking')
    }).catch(next)
}
module.exports.bookingUpdatePost = (req, res, next) => {
    db2.update({
        Pickup: req.body.pickup,
        Destination: req.body.destination,
        Date: req.body.date,
        Time: req.body.time,
    },
        {
            where: { booking_id: req.params.booking_id }
        },
        { multiple: true }
    ).then(user => { res.redirect('/api/user/booking') })
}

module.exports.bookingUpdate = async (req, res, next) => {


    db2.findByPk(req.params.booking_id)
        .then(booking => {
            res.render('booking-show', {
                data: booking
            });
        });

}

module.exports.loginPost = (req, res, next) => {
    db.findOne({
        where: { email: req.body.email, password: req.body.password }
    }).then((user) => {
        if (user == null) {
            return res.render('login', { message: 'Wrong email or password' })
        }
        req.session.passenger_id = user.passenger_id
        req.session.role = user.role
        if (user) {
            if (req.session.role == 'Driver') {

                req.session.passenger_id = user.passenger_id

                db4.findAll({
                    where: { driver_id: user.passenger_id }
                }).then(data => {

                    if (data.length == 0) {
                        res.redirect("/api/cab/add")
                    }
                    else {
                        res.redirect('/api/driver/booking')
                    }
                })
            }
            else if (req.session.role == 'Admin'){

                req.session.passenger_id = user.passenger_id;
    
                res.redirect('/api/mode');
    
            }
            else if (req.session.role == 'Passenger'){

                req.session.passenger_id = user.passenger_id;
    
                res.redirect('/api/booking');
    
            }
            
        }
        

    })
}


module.exports.logOut = (req, res, next) => {
    req.session = null
    res.redirect("/api/login")
}
////////////////////////////////////////////////////////////driver

module.exports.cost = (req, res, next) => {
    res.render('cost')
}

module.exports.costPost = (req, res, next) => {
    db2.update({
        cost: req.body.cost,
        driver_id: req.session.passenger_id,
        booking_status: 'Confirmed'
    },
        {
            where: { booking_id: req.params.booking_id }
        }, { multi: true }
    ).then(user => { res.redirect('/api/driver/booking') })

}
module.exports.confirmedBooking = (req, res, next) => {
    db2.findAll({
        where: {
            driver_id: req.session.passenger_id,
            booking_status: 'Confirmed'

        }
    }).then(user => {
        res.render('confirmed-booking', {
            data: user
        })
    })

}

module.exports.driverUpdate = (req, res, next) => {
    db.findByPk(req.session.passenger_id)
        .then(booking => {
            res.render('driver-update', {
                data: booking
            });
        });
}
module.exports.driverUpdatePost = (req, res, next) => {
    db.update({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    },
        {
            where: { passenger_id: req.session.passenger_id }
        },
        { multiple: true }
    ).then(user => { res.redirect('/api/driver/booking') })
}
module.exports.cabAdd = (req, res, next) => {
    res.render('cab')
}
module.exports.cabAddPost = (req, res, next) => {
    console.log(req.session.passenger_id)
    db4.create({

        cab_number: req.body.cabnumber,
        cab_capacity: req.body.cabcapacity,
        cab_name:req.body.cabname,
        license_no:req.body.lcno,
        driver_id: req.session.passenger_id
    }).then(user => { res.redirect('/api/driver/booking') })
}
module.exports.cabUpdate = (req, res, next) => {
    res.render('cab-update')
}
module.exports.cabUpdatePost = (req, res, next) => {
    db4.update({
        cab_number: req.body.cabnumber,
        cab_capacity: req.body.cabcapacity,

    },
        {
            where: { driver_id: req.session.passenger_id }
        },
        { multiple: true }
    ).then(user => { res.redirect('/api/driver/booking') })
}
module.exports.showBookingToDriver = (req, res, next) => {

    db2.findAll().then(user => {
        res.render('driver-booking-index', {
            data: user
        })
    })


}

module.exports.userDelete = (req, res, next) => {
    db.destroy({
        where: { passenger_id: req.session.passenger_id }
    })
        .then(data => {
            res.redirect('/api/home');
        });
}



//................................................................

module.exports.download = (req, res, next) => {

    let id = req.session.passenger_id;

    db2.findAll({where: {booking_id: id}})

    .then((data) => {
        console.log(data);
        res.render('download',

        {

            data:data,

           

       

        });



    })

}



module.exports.payment=(req,res,next)=>{

 res.render('pay');

}
module.exports.paymentPost=(req,res,next)=>{

 res.render('Payment');

}

module.exports.mode = (req, res, next) => {

    res.render('mode');

}
