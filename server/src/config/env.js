// This file serves as a reference for environment variables.
// In a real environment, you would create a .env file locally.

export const envConfig = {
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/meterpower',
  DISCO_PROVIDER: process.env.DISCO_PROVIDER || 'MOCK',
  JWT_SECRET: process.env.JWT_SECRET || 'your_super_secret_jwt_key_here',
  NODE_ENV: process.env.NODE_ENV || 'development'
};
