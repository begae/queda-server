import { registerAs } from '@nestjs/config';

export default registerAs('swagger', async () => {
  return {
    user: process.env.SWAGGER_USERNAME,
    password: process.env.SWAGGER_PASSWORD,
  };
});
