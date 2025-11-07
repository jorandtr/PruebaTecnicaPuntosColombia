import { Actor } from '../actors/actor';
import { navegaALaWeb } from '../abilities/navegaALaWeb';
import { checkout } from '../interfaces/checkout';

export interface codigo {
  codigo: string;
  screenshotPath: string;

}

export class AplicarCodigoPromocional {
    static codigo(data: { codigo: string; screenshotPath: string }) {
        return new AplicarCodigoPromocional(data);
  }

    constructor(private data: codigo) {}


  async performAs(actor: Actor) {
    const { page } = actor.abilityTo(navegaALaWeb);
    const form = new checkout(page);

    await form.codigoInput.type(this.data.codigo, { delay: 100 });
    await page.waitForTimeout(2000);
    await form.aplicarButton.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: this.data.screenshotPath }); //Captura la imagen y la guarda en la ruta
  }
}