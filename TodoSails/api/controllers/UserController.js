/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const alert = require('alert');
module.exports = {
  signup: (req, res) => {
    try {
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;

      User.create({ name: name, email: email, password: password }).exec(
        (error) => {
          if (error) {
            if (error.code === 'E_UNIQUE') {
              alert('Email already exist !');
              res.redirect('/signup');
            }
          }
          res.redirect('/');
        }
      );
    } catch (error) {
      console.log(error);
    }
  },

  login: (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      User.findOne({ email: email }).exec((err, data) => {
        if (err) {
          return;
        }

        if (data === undefined) {
          alert('Email Not exist !');
          res.redirect('/');
          return;
        } else if (data.password === password) {
          req.session.user = {
            email: data.email,
            id: data.id,
          };
          req.session.user.expires = new Date(
            Date.now() + 3 * 24 * 3600 * 1000
          );
          res.redirect('/todo');
        } else if (data.password !== password) {
          alert('Incorrect password!');
          res.redirect('/');
          return;
        } else {
          alert('Some other problem!');
          res.redirect('/');
          return;
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
};
