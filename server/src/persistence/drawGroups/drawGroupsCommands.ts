import Database from 'better-sqlite3';
import { DrawGroup } from '~/application/drawGroups/models/DrawGroup';
import { DrawGroupParticipant } from '~/application/drawGroups/models/DrawGroupParticipant';
import { appConfig } from '~/config/appConfig';

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
    console.error('Error confirming drawn participant:', error);

    throw error;
  } finally {
    db.close();
  }
};

export const drawGroupsCommands = {
  addParticipant,
  confirmDrawnParticipant,
};
