import { IUser } from '../types';
import Utils from '../utils/Utils';
import DatabaseService from './DatabaseService';

class UsersService {
  constructor(private readonly db: DatabaseService) {}

  // Getting single user from DB by userId
  public async getById(userId: string): Promise<IUser | null> {
    const [rows] = await this.db.execute<IUser[]>(
      'SELECT * FROM `users` WHERE `id` = ?',
      [userId],
    );

    if (Utils.isNotEmpty(rows)) return rows[0];

    return null;
  }

  public async getByEmail(email: string): Promise<IUser | null> {
    const [rows] = await this.db.execute<IUser[]>(
      'SELECT * FROM `users` WHERE `email` = ?',
      [email],
    );

    if (Utils.isNotEmpty(rows)) return rows[0];

    return null;
  }

  // Pulling all users from DB
  public async getAll(): Promise<IUser[] | null> {
    const [rows] = await this.db.query<IUser[]>('SELECT * FROM `users`');

    return rows;
  }
}

export default new UsersService(DatabaseService.getInstance());
