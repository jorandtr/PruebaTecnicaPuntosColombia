import { Actor } from '../actors/actor';
import { navegaALaWeb } from '../abilities/navegaALaWeb';
import { paginaPrincipal } from '../interfaces/paginaPincipal';

export interface Precios {
  precio_min: string;
  precio_max: string;
}

export class FiltrarRangoPrecios {
  static con(data: Precios) {
    return new FiltrarRangoPrecios(data);
  }

  constructor(private data: Precios) {}

  async performAs(actor: Actor) {
    const { page } = actor.abilityTo(navegaALaWeb);
    const form = new paginaPrincipal(page);

    await form.precioMinInput.clear();
    await form.precioMinInput.fill(this.data.precio_min);
    await form.precioMaxInput.clear();
    await form.precioMaxInput.fill(this.data.precio_max);
    await form.precioMaxInput.press('Enter');
  }
}