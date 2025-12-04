import Utils from '../utils/Utils';
import DatabaseService from './DatabaseService';
import { ResultSetHeader } from 'mysql2';

export type TTransactionType = 'INCOMES' | 'OUTGOING';

export interface ILatestAmountPayload {
  amount: string;
}

export interface ITransaction {
  id: number;
  userId: number;
  amount: number;
  description: string;
  transaction_date: string;
  type: TTransactionType;
  created_at: string;
  updated_at: string;
}

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
      'SELECT * FROM `transactions` WHERE `user_id` and `created_at` = ?',
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

  public async getLatestIncomeAmountByUserId(userId: string): Promise<string> {
    const [rows] = await this.db.execute<ILatestAmountPayload[]>(
      `
            select t.amount
                from transactions as t
                left join incomes as i on i.id = t.id
            where t.user_id = ?
            and t.type = 'INCOMES'
            order by t.transaction_date desc
            limit 1;
      `,
      [userId],
    );

    return rows[0]?.amount || '0.00';
  }

  public async getLatestOutgoingAmountByUserId(
    userId: string,
  ): Promise<string> {
    const [rows] = await this.db.execute<ILatestAmountPayload[]>(
      `
            select *
                from transactions as t
                left join outgoings as o on o.id = t.id
            where t.user_id = ?
            and t.type = 'OUTGOING'
            order by t.transaction_date desc
            limit 1;
      `,
      [userId],
    );

    return rows[0]?.amount || '0.00';
  }
}

export default new TransactionsService(DatabaseService.getInstance());
