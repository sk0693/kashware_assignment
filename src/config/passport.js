const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const config = require('./config');
const { User } = require('../models');

require("dotenv").config();
const jwtOptions = {
  secretOrKey: config.jwt.secret,

  jwtFromRequest: jwtExtracter
};
// ExtractJwt.fromAuthHeaderAsBearerToken('Bearer')

// extract data from headers as well as cookies
function jwtExtracter(req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  if (!token) {
    token = req.headers['Authorization'] || req.headers['authorization'];
  }
  token = token.replace('Bearer ',''); 
  return token;
};



const jwtVerify = async (payload, done) => {
  try {
    let user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user.transform());
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};
