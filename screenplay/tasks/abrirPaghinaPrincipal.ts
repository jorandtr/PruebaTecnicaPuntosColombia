import { Actor } from '../actors/actor';
import { navegaALaWeb } from '../abilities/navegaALaWeb';
import { config } from '../../environments/config';

export class AbrirPaginaPrincipal {
  static ahora() {
    return new AbrirPaginaPrincipal();
  }

  async performAs(actor: Actor) {
    const { page } = actor.abilityTo(navegaALaWeb);
    await page.goto(config.baseUrl);
  }
}
