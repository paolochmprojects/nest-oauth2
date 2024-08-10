import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { genSalt, hash } from 'bcrypt';
import { Profile as GoogleProfile } from 'passport';
import config from 'src/config';
import { DatabaseService } from 'src/database/database.service';
import { UserService } from 'src/user/user.service';
import { GenerateRefreshToken, SignInGoogle } from './auth.interface';

const { jwt } = config();
@Injectable()
export class AuthService {
  constructor(
    private db: DatabaseService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async signInGoogle(
    accessToken: string,
    refreshToken: string,
    profile: GoogleProfile,
  ): Promise<SignInGoogle | null> {
    const user = await this.userService.getByEmail(
      profile.emails[0].value,
      false,
    );

    if (user) {
      const token = await this.generateToken(user.id);
      const refreshToken = await this.generateRefreshToken(user.id);
      return {
        accessToken: token,
        refreshToken: refreshToken.refreshToken,
        refreshTokenId: refreshToken.refreshTokenId,
      };
    }

    const newUser = await this.userService.createUser(
      {
        name: profile.displayName,
        email: profile.emails[0].value,
      },
      false,
    );

    const token = await this.generateToken(newUser.id);
    const newRefreshToken = await this.generateRefreshToken(newUser.id);
    return {
      accessToken: token,
      refreshToken: newRefreshToken.refreshToken,
      refreshTokenId: newRefreshToken.refreshTokenId,
    };
  }

  private async generateToken(userId: string): Promise<string> {
    return await this.jwtService.signAsync(
      {
        userId,
      },
      {
        secret: jwt.secret,
        expiresIn: jwt.expires,
      },
    );
  }

  private async generateRefreshToken(
    userId: string,
  ): Promise<GenerateRefreshToken> {
    const refreshToken = await this.jwtService.signAsync(
      {
        userId,
      },
      {
        secret: jwt.refreshSecret,
        expiresIn: jwt.refreshExpires,
      },
    );

    const encryptToken = await this.encryptToken(refreshToken);

    const now = new Date().getTime();

    const tokenRefreshSaved = await this.db.refreshToken.create({
      data: {
        userId,
        token: encryptToken,
        expiresAt: new Date(now + jwt.refreshExpires),
      },
    });

    return {
      refreshToken: refreshToken,
      refreshTokenId: tokenRefreshSaved.id,
    };
  }

  private async encryptToken(token: string) {
    const salt = await genSalt();
    return await hash(token, salt);
  }
}
