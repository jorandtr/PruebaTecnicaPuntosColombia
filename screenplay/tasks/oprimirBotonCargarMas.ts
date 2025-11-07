import { Actor } from '../actors/actor';
import { navegaALaWeb } from '../abilities/navegaALaWeb';
import { paginaPrincipal } from '../interfaces/paginaPincipal';

export class OprimirBotonCargarMas {
    static ahora() {
        return new OprimirBotonCargarMas();
  }


  async performAs(actor: Actor) {
    const { page } = actor.abilityTo(navegaALaWeb);
    const form = new paginaPrincipal(page);

    // Oprime el boton LOAD MORE
    await form.cargarMasButton.waitFor({ state: 'visible' });
    await form.cargarMasButton.click();
  }
}