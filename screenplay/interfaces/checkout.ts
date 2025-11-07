import { Page } from '@playwright/test';

export class checkout {
  constructor(private page: Page)
   {}

get nombreInput() {
return this.page.locator('input[type="text"]').nth(4);    
  }

get emailInput() {
return this.page.locator('input[type="email"]');    
  }

get idInput() {
return this.page.locator('input[type="text"]').nth(5);    
  }

get telefonoInput() {
return this.page.locator('input[type="tel"]');    
  }

get archivoInput() {
return this.page.locator('input[type="file"]');    
  }

get codigoInput() {
return this.page.locator('input[name="promo"]');    
  }

get aplicarButton() {
return this.page.getByRole('button', { name: 'Apply' });     
  }

get marcarCheck() {
return this.page.locator('.theme__check___2B20W');    
  }

get pagarAhora() {
return this.page.getByRole('button', { name: 'Pay now' });    
  }

get mensajeConfirmacion() {
return this.page.getByText('Destination Booked'); 
  }
}