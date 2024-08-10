import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { DatabaseService } from 'src/database/database.service';

export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private db: DatabaseService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/api/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    return {
      accessToken,
      refreshToken,
      profile,
    };
  }
}
