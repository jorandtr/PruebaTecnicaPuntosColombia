import { Page } from '@playwright/test';

export class paginaPrincipal {
  constructor(private page: Page)
   {}

  // Campos principales del formulario
  get partidaOpen() {
    return this.page.getByRole('textbox').first();
  }

  async partidaSelect(partida: string) {
    return this.page.getByText(partida, { exact: true }).first();    
  }

  get okButton() {
    return this.page.getByRole('button', { name: 'Ok', exact: true }).first();
  }

  get regresoOpen() {
    return this.page.getByRole('textbox').nth(1);
  }

  async regresoSelect(regreso: string) {
    return this.page.getByText(regreso, { exact: true }).last();
  }

  get adultosOpen() {
    return this.page.getByRole('textbox').nth(2);
  }

  async adultosSelect(adultos: string) {
  return this.page.getByRole('listitem').filter({ hasText: adultos });
  }

  get ninosOpen() {
    return this.page.getByRole('textbox').nth(3);
  }

  async ninosSelect(ninos: string) {
  return this.page.getByRole('listitem').filter({ hasText: ninos });
  }

  get seleccionarDestinoButton() {
    return this.page.getByRole('button', { name: 'Select Destination' });
  }

  get cargarMasButton() {
  return this.page.getByRole('button', { name: 'Load more' });
  }

  get precioMinInput() {
  return this.page.locator('input[name="name"]');
  }

  get precioMaxInput() {
  return this.page.locator('input[type="text"]').nth(3);
  }

  async destinoViajeSelect(destino: string) {
  return this.page.getByRole('listitem').filter({ hasText: destino });
  }

  async validaDestino(destino: string) {
  return this.page.getByRole('heading', { name: destino}); 
  }

  get bookButton() {
  return this.page.getByRole('button', { name: 'Book',  exact: true });
  }
}