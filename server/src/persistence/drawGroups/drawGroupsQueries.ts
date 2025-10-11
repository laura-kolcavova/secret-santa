import Database from 'better-sqlite3';
import { DrawGroup } from '~/application/drawGroups/models/DrawGroup';
import { DrawGroupParticipant } from '~/application/drawGroups/models/DrawGroupParticipant';
import { appConfig } from '~/config/appConfig';

const findByYear = (year: number, abortSignal: AbortSignal): DrawGroup | undefined => {
  abortSignal.throwIfAborted();

  const db = new Database(appConfig.sqliteDbFilePath, { readonly: true });

  try {
    const stmt = db.prepare(`
        SELECT
            dg.guid,
            dg.year,
            dg.name,
            dg.drawStartUtc,
            dg.drawEndUtc,
            dg.createdAtUtc,
            dgp.email,
            dgp.hasDrawn,
            dgp.isDrawn,
            dgp.drawnParticipantEmail
        FROM draw_groups dg
        LEFT JOIN draw_group_participants dgp ON dg.id = dgp.drawGroupId
        WHERE dg.year = $year`);

    const rows = stmt.all({ year: year }) as any[];

    if (rows.length === 0) {
      return undefined;
    }

    const firstRow = rows[0];

    const participants: DrawGroupParticipant[] = rows
      .filter((row) => row.email)
      .map<DrawGroupParticipant>((row) => ({
        email: row.email,
        hasDrawn: Boolean(row.hasDrawn),
        isDrawn: Boolean(row.isDrawn),
        drawnParticipant: row.drawnParticipantEmail
          ? { email: row.drawnParticipantEmail }
          : undefined,
      }));

    return {
      guid: firstRow.guid,
      year: firstRow.year,
      name: firstRow.name,
      drawStartUtc: new Date(firstRow.drawStartUtc),
      drawEndUtc: new Date(firstRow.drawEndUtc),
      participants,
      createdAtUtc: new Date(firstRow.createdAtUtc),
    };
  } catch (error) {
    console.error('Error finding draw group by year:', error);

    throw error;
  } finally {
    db.close();
  }
};

const findByGuid = (guid: string, abortSignal: AbortSignal): DrawGroup | undefined => {
  abortSignal.throwIfAborted();

  const db = new Database(appConfig.sqliteDbFilePath, { readonly: true });

  try {
    const stmt = db.prepare(`
        SELECT
            dg.guid,
            dg.year,
            dg.name,
            dg.drawStartUtc,
            dg.drawEndUtc,
            dg.createdAtUtc,
            dgp.email,
            dgp.hasDrawn,
            dgp.isDrawn,
            dgp.drawnParticipantEmail
        FROM draw_groups dg
        LEFT JOIN draw_group_participants dgp ON dg.id = dgp.drawGroupId
        WHERE dg.guid = $guid`);

    const rows = stmt.all({ guid: guid }) as any[];

    if (rows.length === 0) {
      return undefined;
    }

    const firstRow = rows[0];

    const participants: DrawGroupParticipant[] = rows
      .filter((row) => row.email)
      .map<DrawGroupParticipant>((row) => ({
        email: row.email,
        hasDrawn: Boolean(row.hasDrawn),
        isDrawn: Boolean(row.isDrawn),
        drawnParticipant: row.drawnParticipantEmail
          ? { email: row.drawnParticipantEmail }
          : undefined,
      }));

    return {
      guid: firstRow.guid,
      year: firstRow.year,
      name: firstRow.name,
      drawStartUtc: new Date(firstRow.drawStartUtc),
      drawEndUtc: new Date(firstRow.drawEndUtc),
      participants,
      createdAtUtc: new Date(firstRow.createdAtUtc),
    };
  } catch (error) {
    console.error('Error finding draw group by year:', error);

    throw error;
  } finally {
    db.close();
  }
};

export const drawGroupsQueries = {
  findByYear,
  findByGuid,
};
