import { Actor } from '../actors/actor';
import { navegaALaWeb } from '../abilities/navegaALaWeb';
import { checkout } from '../interfaces/checkout';

export interface DatosPersonales {
  nombre: string;
  email: string;
  id: string;
  telefono: string;
}

export class LlenarDatosPersonales {
  static con(data: DatosPersonales) {
    return new LlenarDatosPersonales(data);
  }

  constructor(private data: DatosPersonales) {}

  async performAs(actor: Actor) {
    const { page } = actor.abilityTo(navegaALaWeb);
    const form = new checkout(page);

    await form.nombreInput.waitFor({ state: 'visible' });
    await form.nombreInput.fill(this.data.nombre);
      
    await form.emailInput.waitFor({ state: 'visible' });
    await form.emailInput.fill(this.data.email);
      
    await form.idInput.waitFor({ state: 'visible' });
    await form.idInput.fill(this.data.id);

    await page.waitForTimeout(1000)
    await form.telefonoInput.evaluate((el: HTMLInputElement, valor: string) => {
    el.value = valor;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));//Asigna directamente el valor al campo de texto en el DOM.
    el.blur();//Simula que el usuario ha salido del campo
    }, this.data.telefono);
  }  
}