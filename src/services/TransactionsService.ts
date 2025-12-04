import Utils from '../utils/Utils';
import DatabaseService from './DatabaseService';
import { ResultSetHeader } from 'mysql2';
import { PoolConnection } from 'mysql2/promise';

export type TTransactionType = 'INCOMES' | 'OUTGOING';
export type TTransactionStatus = 'PENDING' | 'COMPLETED' | 'FAILED';

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
  status: TTransactionStatus;
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
      'SELECT * FROM `transactions` WHERE `user_id` = ? and YEAR(created_at) = ?;',
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
            order by t.created_at desc
            limit 1;
      `,
      [userId],
    );

    return rows[0]?.amount || '0.00';
  }

  public async createNewIncomeTransaction(
    userId: number,
    amount: string,
    desc: string,
    status: TTransactionType,
    type: TTransactionStatus,
    incomeType: string,
    createdAt: string,
  ): Promise<void> {
    const connection: PoolConnection = await this.db.getConnection();

    await connection.beginTransaction();
    await connection.execute(
      `
        INSERT INTO transactions (user_id, amount, description, type, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?);
    `,
      [userId, amount, desc, type, status, createdAt],
    );

    await connection.execute(
      `
        INSERT INTO incomes (transaction_id, source, is_taxable, amount, income_type)
        VALUES (LAST_INSERT_ID(), ?, TRUE, ?, ?);
    `,
      [desc, amount, incomeType],
    );

    await connection.commit();
  }

  public async createNewOutgoingTransaction(
    userId: number,
    amount: string,
    desc: string,
    status: TTransactionType,
    type: TTransactionStatus,
    outgoingType: string,
    createdAt: string,
  ): Promise<void> {
    const connection: PoolConnection = await this.db.getConnection();

    await connection.beginTransaction();
    await connection.execute(
      `
        INSERT INTO transactions (user_id, amount, description, type, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?);
    `,
      [userId, amount, desc, type, status, createdAt],
    );

    await connection.execute(
      `
        INSERT INTO outgoings (transaction_id, is_essential, outgoing_type)
        VALUES (LAST_INSERT_ID(), TRUE, ?);
    `,
      [outgoingType],
    );

    await connection.commit();
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
            order by t.created_at desc
            limit 1;
      `,
      [userId],
    );

    return rows[0]?.amount || '0.00';
  }
}

export default new TransactionsService(DatabaseService.getInstance());
