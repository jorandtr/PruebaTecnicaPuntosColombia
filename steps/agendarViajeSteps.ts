import { Before, After, Given, When, Then } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { expect } from '@playwright/test';
import { Actor } from '../screenplay/actors/actor';
import { navegaALaWeb } from '../screenplay/abilities/navegaALaWeb';
import { IngresarDatosViaje } from '../screenplay/tasks/ingresarDatosViaje';
import { OprimirBotonCargarMas } from '../screenplay/tasks/oprimirBotonCargarMas';
import { FiltrarRangoPrecios } from '../screenplay/tasks/filtrarRangoPrecios';
import { ElegirDestino } from '../screenplay/tasks/elegirDestino';
import { LlenarDatosPersonales } from '../screenplay/tasks/llenarDatosPersonales';
import { CargarArchivo } from '../screenplay/tasks/cargarArchivo';
import { AplicarCodigoPromocional } from '../screenplay/tasks/aplicarCodigoPromocional';
import { FinalizarCheckout } from '../screenplay/tasks/finalizarCheckout';
import { Confirmacion } from '../screenplay/questions/confirmacion';
import { AbrirPaginaPrincipal } from '../screenplay/tasks/abrirPaghinaPrincipal';

let browser: Browser;
let page: Page;
let actor: Actor;

Before(async function () {
  browser = await chromium.launch({ headless: false, args: ['--start-maximized'] });
  const context = await browser.newContext({ viewport: null });
  page = await context.newPage();

  // Crear actor y darle la habilidad de navegar con Playwright
  actor = new Actor('Cliente').whoCan(navegaALaWeb.using(page));
  // opcional: guardar referencias en this si necesitas en pasos
  this.browser = browser;
  this.page = page;
  this.actor = actor;
});

After(async function () {
  if (browser) {
    await browser.close();
  }
});

Given('el usuario abre la página principal de viajes', async function () {
  await actor.attemptsTo(AbrirPaginaPrincipal.ahora());
});

// Paso 1: Datos de partida, regreso y pasajeros
When(
  'ingresa los datos de partida {string} y regreso {string} la cantidad de adultos {string} y niños {string}',
  async function (partida: string, regreso: string, adultos: string, ninos: string) {
    await actor.attemptsTo(
      IngresarDatosViaje.con({partida, regreso, adultos, ninos})
    );
  }
);
// Paso 2: Presionar LOAD MORE
When('presiona el botón LOAD MORE', 
  async function () {
    await actor.attemptsTo(
      OprimirBotonCargarMas.ahora());
});

// Paso 3: Filtrar precio
When(
  'filtra el precio mínimo {string} y máximo {string}',
  async function (precio_min: string, precio_max: string) {
    await actor.attemptsTo(
      FiltrarRangoPrecios.con({precio_min, precio_max}));
  }
);

// Paso 4: Elegir destino
When('selecciona el destino {string}', 
  async function (destino: any) {
    await actor.attemptsTo(
      ElegirDestino.ahora(destino));
});

// Paso 5: Llenar formulario de datos personales
When('llena los datos personales con:', async function (dataTable: any) {
  const datos = dataTable.rowsHash(); // ← convierte la tabla en objeto
  await actor.attemptsTo(
    LlenarDatosPersonales.con(datos)
  );
});
// Paso 6: carga el archivo 
When('carga el archivo {string}', 
  async function (archivo: string) {
    await actor.attemptsTo(
      CargarArchivo.conArchivo({archivo}));
});

// Paso 7: Aplicar código promocional
When('aplica el código promocional {string}', 
  async function (codigo: string) {
    const screenshotPath = `reports/screenshots/${Date.now()}-promo.png`; //crea la ruta donde de guardara la imagen
    await actor.attemptsTo(
      AplicarCodigoPromocional.codigo({codigo, screenshotPath}));
    await this.attachScreenshot(screenshotPath);  //Adjunta la imagen el reporte     
});

// Paso 8: Finalizar checkout
When('finaliza el checkout', 
  async function () {
    await actor.attemptsTo(
      FinalizarCheckout.ahora());   
});

// Paso 9: Validar mensaje final
Then('el sistema deberia mostrar el mensaje {string}', 
  async function (mensajeEsperado: string) {
    const mensaje = await actor.ask(Confirmacion.mensaje(actor));
      expect(mensaje?.trim()).toEqual(mensajeEsperado); //mensaje? verifica si mensaje no es null ni undefined //trim elimina espacios, satlos de linea etc.
});