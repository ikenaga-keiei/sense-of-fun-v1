import fs from 'fs';
import path from 'path';
import player from 'play-sound';

const MEDIA_DIR = 'random';

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
