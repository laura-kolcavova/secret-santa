import Database from 'better-sqlite3';
import { User } from '~/application/user/models/User';
import { appConfig } from '~/config/appConfig';

const findByEmail = (email: string, abortSignal: AbortSignal): User | undefined => {
  abortSignal.throwIfAborted();

  const db = new Database(appConfig.sqliteDbFilePath, { readonly: true });

  try {
    const stmt = db.prepare(`
        SELECT
            email,
            firstName,
            lastName,
            department,
            hobbies,
            pinHash,
            createdAtUtc
        FROM users
        WHERE email = $email`);

    const row = stmt.get({ email: email }) as any;

    if (!row) {
      return undefined;
    }

    return {
      email: row.email,
      firstName: row.firstName,
      lastName: row.lastName,
      department: row.department,
      hobbies: JSON.parse(row.hobbies),
      pinHash: row.pinHash,
      createdAtUtc: new Date(row.createdAtUtc),
    };
  } catch (error) {
    console.error('Error finding user by email:', error);

    throw error;
  } finally {
    db.close();
  }
};

export const usersQueries = {
  findByEmail,
};
