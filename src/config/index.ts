export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    expires: 60 * 60 * 24,
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'refreshsecret',
    refreshExpires: 60 * 60 * 24,
  },
});
