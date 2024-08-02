// Sets up Password with a local authentication strategy using a Person model

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Person = require('./models/Person');

// Passport local strategy
passport.use(new localStrategy(async (USERNAME, PASSWORD, done) => {
  // authentication logic here
  try {
    console.log('Received credentials: ', USERNAME, PASSWORD);
    const user = await Person.findOne({ username: USERNAME });

    if(!user) {
      return done(null, false, {message: "Incorrect  username."});
    }

    const isPasswordMatch = await user.comparePassword(PASSWORD);

    if(isPasswordMatch) {
      return done(null, user);
    }
    else {
      return done(null, false, {message: "Incorrect  username."})
    }
  }
  catch(err) {
    return done(err);
  }
}
));

module.exports = passport;    // Export configured passport