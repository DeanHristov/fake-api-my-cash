class HealthService {
  constructor() {}

  public async healthCheck(): Promise<string> {
    return 'Ok';
  }
}

export default new HealthService();
