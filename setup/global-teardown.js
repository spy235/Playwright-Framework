import fs from 'fs';

const STORAGE_PATH = 'config/adminState.json';

export default async () => {
  if (fs.existsSync(STORAGE_PATH)) {
    fs.unlinkSync(STORAGE_PATH);
    console.log('Storage state cleaned up after test suite');
  }
};
