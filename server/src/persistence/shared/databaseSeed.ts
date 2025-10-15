import Database from 'better-sqlite3';

const drawGroup = () => `
    INSERT INTO draw_groups (
        guid,
        year,
        name,
        drawStartUtc,
        drawEndUtc,
        createdAtUtc)
    SELECT
        '${crypto.randomUUID()}',
        2025,
        'Christmas 2025',
        '2025-10-31T23:00:00.000Z',
        '2025-12-31T23:00:00.000Z',
        '${new Date().toISOString()}'
    WHERE NOT EXISTS (
        SELECT
            1
        FROM draw_groups
        WHERE name = 'Christmas 2025' AND YEAR = 2025
        LIMIT 1)`;

export const seedDatabase = (sqliteDbFilePath: string) => {
  const db = new Database(sqliteDbFilePath, { readonly: false });

  try {
    db.exec(drawGroup());
  } catch (error) {
    console.error('Error seeding database:', error);

    throw error;
  } finally {
    db.close();
  }
};
