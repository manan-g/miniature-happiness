//jshint esversion:6
const passport = require("passport");

const User = require("../models/user");
const logger = require("../Utils/logger");

//change password

//-----------error handling ----------------->
/*

--> An internal error occurred trying to fetch the users' information (say the database connection is gone); this error would be passed on: next(err); this will be handled by Express and generate an HTTP 500 response;

--> The provided credentials are invalid (there is no user with the supplied e-mail address, or the password is a mismatch); in that case, you don't generate an error, but you pass a false as the user object: next(null, false); this will trigger the failureRedirect (if you don't define one, a HTTP 401 Unauthorized response will be generated);
*/
//-----------error handling ends ----------------->

exports.login = async (req, res) => {
    passport.authenticate(
        "local"
        // , {
        //     failureRedirect: "/login",
        //     failureFlash: true,
        // }
    )(req, res, () => {
        if (req.user) {
            res.json({
                username: req.user.username,
                // email: req.user.email,
                firstName: req.user.firstName,
                lastName: req.user.lastName,
                items: req.user.items,
                // user: req.user,
            });
        } else {
            next("some Error occured!");
        }
    });
};

exports.register = (req, res, next) => {
    User.register(
        {
            username: req.body.username,
            // email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        },
        req.body.password,
        (err, user) => {
            if (err) {
                logger.logError(err);
                res.status(400).json(err.message?err.message:"Error");
                // if (
                //     err.message ===
                //     "A user with the given username is already registered"
                // )
                //     res.json("User already exists");
                // else next(err);
                
            } else {
                passport.authenticate("local"
                // , {
                //     failureRedirect: "/register",
                //     failureFlash: true,
                // }
                )(req, res, () => {
                    if (req.user) {
                        res.json({
                            username: req.user.username,
                            // email: req.user.email,
                            firstName: req.user.firstName,
                            lastName: req.user.lastName,
                            items: req.user.items,
                            // user: req.user,
                        });
                    } else {
                        next("some Error occured!");
                    }
                });
            }
        }
    );
};

exports.logout = (req, res) => {
    req.logout();
    res.json("Logout Successful");
};

exports.getUser = (req, res) => {
    if (req.user)
        res.json({
            username: req.user.username,
            // email: req.user.email,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            items: req.user.items,
            // user: req.user,
        });
    else res.status(401).json("unauth");
};

exports.check_auth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.json("User not authenticated");
    }
};

exports.check_admin =(req,res,next) =>{
    if(req.user.admin===1)
    {
        next();
    }
    else
    {
        res.json("Invalid");
    }
}

exports.check_not_auth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        res.json({
            username: req.user.username,
            // email: req.user.email,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            items: req.user.items,
            // user: req.user,
        });
    }
};
