import { ITransaction } from '../types';
import Utils from '../utils/Utils';
import DatabaseService from './DatabaseService';
import { ResultSetHeader } from 'mysql2';

class TransactionsService {
  constructor(private readonly db: DatabaseService) {}

  // Getting single transaction from DB by userId
  public async getById(transactionId: string): Promise<ITransaction | null> {
    const [rows] = await this.db.execute<ITransaction[]>(
      'SELECT * FROM `transactions` WHERE `id` = ?',
      [transactionId],
    );

    if (Utils.isNotEmpty(rows)) return rows[0];

    return null;
  }

  // Getting all transactions from DB by userId and date period
  public async getAllByUserId(
    userId: string,
    date: string,
  ): Promise<ITransaction[] | null> {
    const [rows] = await this.db.execute<ITransaction[]>(
      'SELECT * FROM `transactions` WHERE `user_id` and `transaction_date` = ?',
      [userId, date],
    );

    if (Utils.isNotEmpty(rows)) return rows;

    return null;
  }

  // Pulling all transactions from DB. No metter user or date
  public async getAll(): Promise<ITransaction[] | null> {
    const [rows] = await this.db.query<ITransaction[]>(
      'SELECT * FROM `transactions`',
    );

    return rows;
  }

  // Delete single transaction from DB
  public async deleteById(id: string): Promise<boolean> {
    const [{ affectedRows }] = await this.db.execute<ResultSetHeader>(
      'DELETE FROM `transactions` WHERE id = ?',
      [id],
    );

    if (affectedRows > 0) return true;

    return false;
  }
}

export default new TransactionsService(DatabaseService.getInstance());
