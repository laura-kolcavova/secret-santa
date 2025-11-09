import fs from 'fs';
import { normalizeEmail } from '~/application/shared/utils/emailHelper';

const loadDrawGroupManagers = () => {
  const configPath = './drawGroupManagers.json';

  if (!fs.existsSync(configPath)) {
    throw new Error(`DrawGroupManagers.json file not found: ${configPath}`);
  }

  const fileContent = fs.readFileSync(configPath, 'utf-8');

  return JSON.parse(fileContent) as { drawGroupManagers: string[] };
};

export const isDrawGroupManager = (email: string): boolean => {
  const normalizedEmail = normalizeEmail(email);

  const drawGroupManagersConfig = loadDrawGroupManagers();

  return drawGroupManagersConfig.drawGroupManagers.includes(normalizedEmail);
};
