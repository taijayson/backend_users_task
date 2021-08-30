const passport = require('passport');
const passportJwt = require('passport-jwt');
require('dotenv').config();

const db = require('../db/db');

const { ExtractJwt, Strategy } = passportJwt;
const { TOKEN_KEY } = process.env;

const settings = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: TOKEN_KEY,
};

passport.use(
  new Strategy(settings, async (payload, done) => {
    try {
      const user = await db.query(`SELECT * from users where id=$1`, [
        payload.id,
      ]);
      if (!user) {
        throw new Error('User not found');
      }
      done(null, user);
    } catch (error) {
      done(error);
    }
  })
);
