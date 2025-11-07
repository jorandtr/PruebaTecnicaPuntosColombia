import { setWorldConstructor, World } from '@cucumber/cucumber';
import fs from 'fs';

class CustomWorld extends World {
  async attachScreenshot(filePath: string) {
    const image = fs.readFileSync(filePath);
    this.attach(image, 'image/png');
  }
}

setWorldConstructor(CustomWorld);
