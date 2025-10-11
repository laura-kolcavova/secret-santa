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

    CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email
    ON users (email);
  `;

const drawGroupsSql = `
    CREATE TABLE IF NOT EXISTS draw_groups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        guid TEXT NOT NULL,
        year INTEGER NOT NULL,
        name TEXT NOT NULL,
        drawStartUtc TEXT NOT NULL,
        drawEndUtc TEXT NOT NULL,
        createdAtUtc TEXT NOT NULL
    );

    CREATE UNIQUE INDEX IF NOT EXISTS idx_draw_groups_guid
    ON draw_groups (guid);

    CREATE UNIQUE INDEX IF NOT EXISTS idx_draw_groups_name_year
    ON draw_groups (name, year);
  `;

const drawGroupParticipantsSql = `
    CREATE TABLE IF NOT EXISTS draw_group_participants (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        drawGroupId INTEGER NOT NULL,
        email TEXT NOT NULL,
        hasDrawn INTEGER NOT NULL DEFAULT 0,
        isDrawn INTEGER NOT NULL DEFAULT 0,
        drawnParticipantEmail TEXT,
        FOREIGN KEY (drawGroupId) REFERENCES draw_groups (id) ON DELETE CASCADE
    );

    CREATE UNIQUE INDEX IF NOT EXISTS idx_draw_group_participants_drawGroupId_email
    ON draw_group_participants (drawGroupId, email);
  `;

export const ensureDatabaseDeployed = (sqliteDbFilePath: string): void => {
  const db = new Database(sqliteDbFilePath, { readonly: false });

  try {
    db.exec(`${usersSql} ${drawGroupsSql} ${drawGroupParticipantsSql}`);
  } catch (error) {
    console.error('Error creating database schema:', error);

    throw error;
  } finally {
    db.close();
  }
};
