import DatabaseService from './DatabaseService';

class IncomesService {
  constructor(private readonly db: DatabaseService) {}

  public async getById(id: string): Promise<void> {
    // TODO Implement it
  }

  public async getByTransactionId(id: string): Promise<void> {
    // TODO Implement it
  }

  public async getAll(): Promise<void> {
    // TODO Implement it
  }
}

export default new IncomesService(DatabaseService.getInstance());
