import { Actor } from '../actors/actor';
import { navegaALaWeb } from '../abilities/navegaALaWeb';
import { paginaPrincipal } from '../interfaces/paginaPincipal';

export interface DatosViaje {
  partida: string;
  regreso: string;
  adultos: string;
  ninos: string;
}

export class IngresarDatosViaje {
  static con(data: DatosViaje) {
    return new IngresarDatosViaje(data);
  }

  constructor(private data: DatosViaje) {}

  async performAs(actor: Actor) {
    const { page } = actor.abilityTo(navegaALaWeb);
    const form = new paginaPrincipal(page);

    // Completar los campos de viaje
    await form.partidaOpen.waitFor({ state: 'visible' });
    await form.partidaOpen.click();

    const partidaOption = await form.partidaSelect(this.data.partida);
    await partidaOption.waitFor({ state: 'visible' });
    await partidaOption.click();

    await form.okButton.waitFor({ state: 'visible' });
    await form.okButton.click();

    await form.regresoOpen.waitFor({ state: 'visible' });
    await form.regresoOpen.click();

    const regresoOption = await form.regresoSelect(this.data.regreso);
    await regresoOption.waitFor({ state: 'visible' });
    await regresoOption.click();

    await form.okButton.waitFor({ state: 'visible' });
    await form.okButton.click();

    await form.adultosOpen.waitFor({ state: 'visible' });
    await form.adultosOpen.click();

    const adultosOption = await form.adultosSelect(this.data.adultos);
    await adultosOption.waitFor({ state: 'visible' });
    await adultosOption.click();

    await form.ninosOpen.waitFor({ state: 'visible' });
    await form.ninosOpen.click();

    const ninosOption = await form.ninosSelect(this.data.ninos);
    await ninosOption.waitFor({ state: 'visible' });
    await ninosOption.click();

    // Accionar el botón de búsqueda
    await form.seleccionarDestinoButton.click();  
  }
}