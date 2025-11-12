import Database from 'better-sqlite3';
import { DrawGroup } from '~/application/drawGroups/models/DrawGroup';
import { DrawGroupParticipant } from '~/application/drawGroups/models/DrawGroupParticipant';
import { appConfig } from '~/config/appConfig';
import _ from 'lodash';

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

const getAllByYear = (year: number, abortSignal: AbortSignal): DrawGroup[] => {
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
      return [];
    }

    const groupsByGuid = _.groupBy(rows, 'guid');

    const drawGroups = Object.values(groupsByGuid).map<DrawGroup>((rows) => {
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
        createdAtUtc: new Date(firstRow.createdAtUtc),
        participants,
      };
    });

    return drawGroups;
  } catch (error) {
    console.error('Error finding draw group by year:', error);

    throw error;
  } finally {
    db.close();
  }
};

const getAll = (abortSignal: AbortSignal): DrawGroup[] => {
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
        LEFT JOIN draw_group_participants dgp ON dg.id = dgp.drawGroupId`);

    const rows = stmt.all() as any[];

    if (rows.length === 0) {
      return [];
    }

    const groupsByGuid = _.groupBy(rows, 'guid');

    const drawGroups = Object.values(groupsByGuid).map<DrawGroup>((rows) => {
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
        createdAtUtc: new Date(firstRow.createdAtUtc),
        participants,
      };
    });

    return drawGroups;
  } catch (error) {
    console.error('Error finding draw group by year:', error);

    throw error;
  } finally {
    db.close();
  }
};

const addParticipant = (
  drawGroup: DrawGroup,
  participant: DrawGroupParticipant,
  abortSignal: AbortSignal,
): void => {
  abortSignal.throwIfAborted();

  const db = new Database(appConfig.sqliteDbFilePath, { readonly: false });

  try {
    const stmt = db.prepare(`
        INSERT INTO draw_group_participants (
            drawGroupId,
            email
        )
        VALUES (
            (
                SELECT
                    id
                FROM draw_groups
                WHERE guid = $drawGroupGuid
            ),
            $email
        )`);

    stmt.run({
      drawGroupGuid: drawGroup.guid,
      email: participant.email,
    });
  } catch (error) {
    console.error('Error adding participant to draw group:', error);

    throw error;
  } finally {
    db.close();
  }
};

const confirmDrawnParticipant = (
  drawGroup: DrawGroup,
  participant: DrawGroupParticipant,
  abortSignal: AbortSignal,
): void => {
  abortSignal.throwIfAborted();

  const db = new Database(appConfig.sqliteDbFilePath, { readonly: false });

  try {
    const updateParticipant = db.prepare(`
      UPDATE draw_group_participants
      SET
        hasDrawn = 1,
        drawnParticipantEmail = $drawnParticipantEmail
      WHERE drawGroupId = (
        SELECT
          id
        FROM draw_groups
        WHERE guid = $drawGroupGuid
        LIMIT 1
      )
      AND email = $participantEmail`);

    const updateDrawnParticipant = db.prepare(`
        UPDATE draw_group_participants
        SET
            isDrawn = 1
        WHERE drawGroupId = (
            SELECT
                id
            FROM draw_groups
            WHERE guid = $drawGroupGuid
            LIMIT 1
        )
        AND email = $drawnParticipantEmail`);

    const transaction = db.transaction(() => {
      updateParticipant.run({
        drawGroupGuid: drawGroup.guid,
        participantEmail: participant.email,
        drawnParticipantEmail: participant.drawnParticipant!.email,
      });

      updateDrawnParticipant.run({
        drawGroupGuid: drawGroup.guid,
        drawnParticipantEmail: participant.drawnParticipant!.email,
      });
    });

    transaction();
  } catch (error) {
    console.error('Error updating drawn participant:', error);

    throw error;
  } finally {
    db.close();
  }
};

const editDrawGroup = (drawGroup: DrawGroup, abortSignal: AbortSignal): void => {
  abortSignal.throwIfAborted();

  const db = new Database(appConfig.sqliteDbFilePath, { readonly: false });

  try {
    const stmt = db.prepare(`
      UPDATE draw_groups
      SET
        name = $name,
        drawStartUtc = $drawStartUtc,
        drawEndUtc = $drawEndUtc
      WHERE guid = $guid`);

    stmt.run({
      guid: drawGroup.guid,
      name: drawGroup.name,
      drawStartUtc: drawGroup.drawStartUtc.toISOString(),
      drawEndUtc: drawGroup.drawEndUtc.toISOString(),
    });
  } catch (error) {
    console.error('Error while updating draw group:', error);

    throw error;
  } finally {
    db.close();
  }
};

export const drawGroupRepository = {
  findByGuid,
  getAllByYear,
  getAll,
  addParticipant,
  confirmDrawnParticipant,
  editDrawGroup,
};
