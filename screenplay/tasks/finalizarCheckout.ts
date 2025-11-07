import { Actor } from '../actors/actor';
import { navegaALaWeb } from '../abilities/navegaALaWeb';
import { checkout } from '../interfaces/checkout';

export class FinalizarCheckout {
    static ahora() {
        return new FinalizarCheckout();
  }


  async performAs(actor: Actor) {
    const { page } = actor.abilityTo(navegaALaWeb);
    const form = new checkout(page);

    // Oprime el boton LOAD MORE
    await form.marcarCheck.click();
    await form.pagarAhora.click();
  }
}