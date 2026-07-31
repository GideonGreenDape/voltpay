export class BaseProvider {
  async verifyMeter(meterNumber, disco, meterType) {
    throw new Error("Method verifyMeter() must be implemented.");
  }
  
  async vendToken(reference, meterNumber, disco, amount) {
    throw new Error("Method vendToken() must be implemented.");
  }
}
