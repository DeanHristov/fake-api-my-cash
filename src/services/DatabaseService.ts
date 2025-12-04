import { FieldPacket } from 'mysql2/typings/mysql/lib/protocol/packets';
import { IDatabase } from '../types';
import { createPool, Pool, PoolConnection } from 'mysql2/promise';

// This class acts as driver between our API and DB (MySQL)

//@see: https://github.com/DeanHristov/ts-design-patterns-cheat-sheet/wiki/Singleton-Design-Pattern
//@see: https://sidorares.github.io/node-mysql2/docs
class DatabaseService implements IDatabase {
  private static instance: DatabaseService;
  private pool: Pool;

  private constructor() {
    this.pool = createPool({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT!),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      idleTimeout: 10000,
    });
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }

    return DatabaseService.instance;
  }

  // Checking whether DB connections is connected
  public async healthCheck(): Promise<boolean> {
    try {
      await this.pool.execute('SELECT 1');
      return true;
    } catch (error) {
      console.error('DB health check failed:', error);
      return false;
    }
  }

  // Execute a query without parameters
  public async query<T>(query: string): Promise<[T, FieldPacket[]]> {
    try {
      const [rows, fields] = await this.pool.query(query);
      return [rows as T, fields];
    } catch (error) {
      console.error('Error! DB query failed:', error);
      throw error;
    }
  }

  // Execute a query with parameters
  public async execute<T>(
    query: string,
    params: Array<string | number> = [],
  ): Promise<[T, FieldPacket[]]> {
    try {
      const [rows, fields] = await this.pool.execute(query, params);
      return [rows as T, fields];
    } catch (error) {
      console.error('Error! DB query failed:', error);
      throw error;
    }
  }

  public async getConnection(): Promise<PoolConnection> {
    return await this.pool.getConnection();
  }

  // Close the pool and all connections
  public async close(): Promise<void> {
    try {
      await this.pool.end();
      // this.isConnected = false;
      console.log('DB connection closed');
    } catch (error) {
      console.error(
        'Error!  Closing DB connection pool failed with error:',
        error,
      );
      throw error;
    }
  }
}

export default DatabaseService;
