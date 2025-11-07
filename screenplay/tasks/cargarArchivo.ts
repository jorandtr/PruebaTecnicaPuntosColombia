import { Actor } from '../actors/actor';
import { navegaALaWeb } from '../abilities/navegaALaWeb';
import { checkout } from '../interfaces/checkout';
import path from 'path';

export interface archivo {
  archivo: string;
}

export class CargarArchivo {
  static conArchivo(data: archivo) {
    return new CargarArchivo(data);
  }

  constructor(private data: archivo) {}

  async performAs(actor: Actor) {
    const { page } = actor.abilityTo(navegaALaWeb);
    const form = new checkout(page);

    await page.waitForTimeout(1000);
    const rutaAbsoluta = path.resolve(this.data.archivo);
    await form.archivoInput.setInputFiles(rutaAbsoluta);
    await page.waitForTimeout(1000);           
  }
}