const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using password
passport.use(new LocalStrategy({
    usernameField: 'email'
},
function(email, password, done){
    // find a user and establish the identity
    User.findOne({email: email},function(err, user) {
        if (err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }
        if (!user || user.password != password){
            console.log ('Invailed Username/Password');
            return done(null, false);
        }

            return done(null, user);
        });
    }
));



//serializing the user to decide which key is to be kept in  the cookies 
passport.serializeUser(function(user, done){
    done(null, user.id);
});


// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(Id, function(err, user){
        if(err){
            console.log('Error in the finding user --> Passport');
            return done(err);
        }


        return done(null, user);
    });
});


// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is sign in. then pass on the requqest to the next fuction(controller's action)
    return res.redirect('/users/sign-in');
}

passport.setAuthenticationdUser = function(req, res, next){
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and  we are just sending this to the locals form the views
        req.locals.user = req.user;
    }
}



module.exports = passport;