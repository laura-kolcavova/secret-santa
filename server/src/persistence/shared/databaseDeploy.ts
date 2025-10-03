import Database from 'better-sqlite3';

const usersSql = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      department TEXT NOT NULL,
      hobbies TEXT NOT NULL,
      pinHash TEXT NOT NULL,
      createdAtUtc TEXT NOT NULL
    );

    CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users (email);
  `;

export const ensureDatabaseDeployed = (sqliteDbFilePath: string): void => {
  const db = new Database(sqliteDbFilePath, { readonly: false });

  try {
    db.exec(usersSql);
  } catch (error) {
    console.error('Error creating database schema:', error);

    throw error;
  } finally {
    db.close();
  }
};
