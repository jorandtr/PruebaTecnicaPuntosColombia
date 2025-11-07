import { Actor } from '../actors/actor';
import { navegaALaWeb } from '../abilities/navegaALaWeb';
import { checkout } from '../interfaces/checkout';

export class Confirmacion {
  static async mensaje(actor: Actor): Promise<string> {
    const { page } = actor.abilityTo(navegaALaWeb);
    const form = new checkout(page);
    return (await form.mensajeConfirmacion.textContent()) ??''; //Esto asegura que si el resultado es null, se devuelve una cadena vacía
  }
}


