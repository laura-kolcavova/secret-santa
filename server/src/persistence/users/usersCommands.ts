import Database from 'better-sqlite3';
import { User } from '~/application/user/models/User';
import { appConfig } from '~/config/appConfig';

const addUser = (user: User): void => {
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

const updateProfile = (user: User): void => {
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

const updatePinHash = (user: User): void => {
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

export const usersCommands = {
  addUser,
  updateProfile,
  updatePinHash,
};
