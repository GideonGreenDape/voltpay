import { MockProvider } from './MockProvider.js';
import { envConfig } from '../../config/env.js';

export const getProvider = () => {
  if (envConfig.DISCO_PROVIDER === 'MOCK') {
    return new MockProvider();
  }
  // Future: Add other providers here
  throw new Error("Provider not implemented");
};
