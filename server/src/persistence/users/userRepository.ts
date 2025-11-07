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
      roles: [],
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

const addUser = (user: User, abortSignal: AbortSignal): void => {
  abortSignal.throwIfAborted();

  const db = new Database(appConfig.sqliteDbFilePath, { readonly: false });

  try {
    const stmt = db.prepare(`
        INSERT INTO users (
            email,
            firstName,
            lastName,
            department,
            hobbies,
            pinHash,
            createdAtUtc
        )
        VALUES (
            $email,
            $firstName,
            $lastName,
            $department,
            $hobbies,
            $pinHash,
            $createdAtUtc
        )`);

    stmt.run({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      department: user.department,
      hobbies: JSON.stringify(user.hobbies),
      pinHash: user.pinHash,
      createdAtUtc: user.createdAtUtc.toISOString(),
    });
  } catch (error) {
    console.error('Error adding user:', error);

    throw error;
  } finally {
    db.close();
  }
};

const updateProfile = (user: User, abortSignal: AbortSignal): void => {
  abortSignal.throwIfAborted();

  const db = new Database(appConfig.sqliteDbFilePath, { readonly: false });

  try {
    const stmt = db.prepare(`
        UPDATE users
        SET
            firstName = $firstName,
            lastName = $lastName,
            department = $department,
            hobbies = $hobbies
        WHERE email = $email`);

    stmt.run({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      department: user.department,
      hobbies: JSON.stringify(user.hobbies),
    });
  } catch (error) {
    console.error('Error updating user profile:', error);

    throw error;
  } finally {
    db.close();
  }
};

const updatePinHash = (user: User, abortSignal: AbortSignal): void => {
  abortSignal.throwIfAborted();

  const db = new Database(appConfig.sqliteDbFilePath, { readonly: false });

  try {
    const stmt = db.prepare(`
        UPDATE users
        SET
            pinHash = $pinHash
        WHERE email = $email`);

    stmt.run({
      email: user.email,
      pinHash: user.pinHash,
    });
  } catch (error) {
    console.error('Error updating user PIN hash:', error);

    throw error;
  } finally {
    db.close();
  }
};

export const userRepository = {
  findByEmail,
  addUser,
  updateProfile,
  updatePinHash,
};
