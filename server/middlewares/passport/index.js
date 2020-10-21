const GraphqlStrategy = require('./strategies');
const User = require('../../database/models/user');

exports.init = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (error, user) => {
      done(error, user);
    })
  })

  passport.use('graphql', new GraphqlStrategy(({email, password}, done) => {
    User.findOne({email}, (error, user) => {
      if (error) return done(error);
      if (!user) return done(null, false);

      user.validatePassword(password, (error, isSuccess) => {
        if (error) return done(error);
        if (!isSuccess) return done(null, false);

        return done(null, user);
      });
    })
  }));
}
