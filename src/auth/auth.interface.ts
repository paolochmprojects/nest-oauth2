export interface SignInGoogle {
  accessToken: string;
  refreshToken: string;
  refreshTokenId: string;
}

export interface GenerateRefreshToken {
  refreshToken: string;
  refreshTokenId: string;
}
