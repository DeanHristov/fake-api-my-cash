import { FieldPacket } from 'mysql2/typings/mysql/lib/protocol/packets';

export type TCurrency = 'USD';
export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  currency_code: TCurrency;
  created_at: Date;
  updated_at: Date;
}

// We define this database contract in this way because
// later we can easily swap between diff type of DBs.
// Example: MySQL <-> PostgreSQL <-> Mongo etc.
interface IDatabase {
  healthCheck: () => Promise<boolean>;
  query: <T>(query: string) => Promise<[T, FieldPacket[]]>;
  execute: <T>(
    query: string,
    params: Array<string | number>,
  ) => Promise<[T, FieldPacket[]]>;
  close: (query: string) => Promise<void>;
}
