import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default registerAs('jwt_config', (): JwtModuleOptions => {
  return {
    global: true,
    secret: process.env.JWT_SECRET_KEY,
    signOptions: {
      expiresIn: '1h',
    },
  };
});
