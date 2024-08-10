import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleOAuthGuard } from './guards/google.guard';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { Profile as GoogleProfile } from 'passport-google-oauth20';
import config from 'src/config';
import { ApiTags } from '@nestjs/swagger';

const { port } = config();

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth() {}

  @Get('google/redirect')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const { accessToken, refreshToken, profile } = req.user as {
      accessToken: string;
      refreshToken: string;
      profile: GoogleProfile;
    };

    const result = await this.authService.signInGoogle(
      accessToken,
      refreshToken,
      profile,
    );

    if (!result) {
      return res.redirect(`http://localhost:${port}/api`);
    }

    const {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      refreshTokenId,
    } = result;

    res.cookie('accessToken', newAccessToken, {
      secure: true,
      httpOnly: true,
    });
    res.cookie('refreshToken', newRefreshToken, {
      secure: true,
      httpOnly: true,
    });
    res.cookie('refreshTokenId', refreshTokenId, {
      secure: true,
      httpOnly: true,
    });

    return res.redirect(`http://localhost:${port}/api`);
  }
}
