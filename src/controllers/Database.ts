import mysql, { Pool } from 'mysql2/promise';
import { FieldPacket } from 'mysql2/typings/mysql/lib/protocol/packets';
import { IDatabase } from '../types';

// This class acts as driver between our API and DB (MySQL)

//@see: https://github.com/DeanHristov/ts-design-patterns-cheat-sheet/wiki/Singleton-Design-Pattern
//@see: https://sidorares.github.io/node-mysql2/docs
class Database implements IDatabase {
  private static instance: Database;
  private pool: Pool;
  // private isConnected: boolean = false;

  private constructor() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT!),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      idleTimeout: 60000,
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  // Checking whether DB connections is connected
  public async healthCheck(): Promise<boolean> {
    try {
      await this.pool.execute('SELECT 1');
      // this.isConnected = true;
      return true;
    } catch (error) {
      // this.isConnected = false;
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

export default Database;
