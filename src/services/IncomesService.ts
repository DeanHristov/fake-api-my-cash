import DatabaseService from './DatabaseService';
import Utils from '../utils/Utils';
import { ResultSetHeader } from 'mysql2';

export interface IIncome {
  id: number;
  transaction_id: number;
  is_taxable: 0 | 1;
  source: string;
  amount: number;
  income_type: string; // It could be type
}
class IncomesService {
  constructor(private readonly db: DatabaseService) {}

  public async getById(incomeId: string): Promise<IIncome | null> {
    const [rows] = await this.db.execute<IIncome[]>(
      'SELECT * FROM incomes WHERE id = ?',
      [incomeId],
    );

    if (Utils.isNotEmpty(rows)) return rows[0];

    return null;
  }

  public async getAll(): Promise<IIncome[]> {
    const [rows] = await this.db.query<IIncome[]>('SELECT * FROM incomes');

    return rows;
  }

  public async deleteById(id: string): Promise<boolean> {
    const [{ affectedRows }] = await this.db.execute<ResultSetHeader>(
      'DELETE FROM `incomes` WHERE id = ?',
      [id],
    );

    if (affectedRows > 0) return true;

    return false;
  }
}

export default new IncomesService(DatabaseService.getInstance());
