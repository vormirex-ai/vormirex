import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../modules/user/user.model.js';
import { env } from './env.js';

passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // 1. Check if user already exists with this Google ID
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          return done(null, existingUser);
        }

        // 2. Check if user exists with the same email (Account Linking)
        // If a user signed up with email/password before, we link this Google account to them.
        const existingEmailUser = await User.findOne({
          email: profile.emails?.[0].value,
        });

        if (existingEmailUser) {
          existingEmailUser.googleId = profile.id;
          existingEmailUser.provider = 'google'; // Or keep 'local' and allow both
          existingEmailUser.isVerified = true; // Google emails are verified
          await existingEmailUser.save();
          return done(null, existingEmailUser);
        }

        // 3. Create a new user
        const newUser = await User.create({
          name: profile.displayName,
          email: profile.emails?.[0].value,
          googleId: profile.id,
          provider: 'google',
          isVerified: true, // Google verifies emails
        });

        return done(null, newUser);
      } catch (error) {
        return done(error, undefined);
      }
    }
  )
);

export default passport;
