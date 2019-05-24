const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        res.status(200).json({msg:"Invalid email or password",isLoggedIn:false});
        //return res.redirect('/');
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.status(200).json({msg:"User Logged in",isLoggedIn:true});
            });
          }
          req.flash('error', 'Invalid email or password.');
          res.status(200).json({msg:"Invalid email or password",isLoggedIn:false});
        })
        .catch(err => {
          console.log(err);
          res.status(200).json({msg:"Sorry ! Some error occured.",isLoggedIn:false});
        });
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
       res.status(200).json({msg:"User Already exists with the this Email"});
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] }
          });
          return user.save();
        })
        .then(result => {
          res.status(200).json({msg:"User Registered Successfully! Login now"});
        });
    })
    .catch(err => {
      res.status(200).json({msg:"Some Error Occurred:"});
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
