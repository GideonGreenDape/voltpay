import { BaseProvider } from './BaseProvider.js';

export class MockProvider extends BaseProvider {
  async verifyMeter(meterNumber, disco, meterType) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (meterNumber.startsWith('000')) {
      throw new Error("Invalid Meter Number");
    }

    return {
      customerName: "Ufuoma Gideon Iboyi",
      address: "12 Market Road, Effurun, Delta State",
      meterNumber,
      disco
    };
  }
  
  async vendToken(reference, meterNumber, disco, amount) {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    return {
      token: "4412-8821-9901-2041-8812",
      units: (amount / 115).toFixed(1),
      reference
    };
  }
}
