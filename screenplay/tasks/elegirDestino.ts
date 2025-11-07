import { Actor } from '../actors/actor';
import { navegaALaWeb } from '../abilities/navegaALaWeb';
import { paginaPrincipal } from '../interfaces/paginaPincipal';

export interface Destino {
  destino: string;
}

export class ElegirDestino {
  static ahora(data: Destino) {
    return new ElegirDestino(data);
  }

  constructor(private data: Destino) {}

  async performAs(actor: Actor) {
    const { page } = actor.abilityTo(navegaALaWeb);
    const form = new paginaPrincipal(page);

    const destinoLocator = await form.destinoViajeSelect(this.data.destino);
    await destinoLocator.waitFor({ state: 'visible', timeout: 5000 });
    await form.bookButton.first().click();
  }
}