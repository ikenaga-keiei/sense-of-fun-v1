import fs from 'fs';
import path from 'path';
import player from 'play-sound';

const MEDIA_DIR = 'random';

if (!fs.existsSync(MEDIA_DIR)) {
  console.error(
    `Directory ${MEDIA_DIR} does not exist. Please create it and add some sound files.`
  );
  process.exit(1);
}

const playerInstance = player();

const playSound = (file: string) =>
  new Promise<void>((resolve, reject) => {
    playerInstance.play(file, (err: any) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

const pickRandomFile = (dir: string): string => {
  const files = fs.readdirSync(path.resolve(dir));
  const randomIndex = Math.floor(Math.random() * files.length);
  return files[randomIndex];
};

const playRandomSound = async () => {
  const file = pickRandomFile(MEDIA_DIR);
  await playSound(path.join(MEDIA_DIR, file));
};

try {
  playRandomSound();
} catch (e) {
  console.error(e);
}
