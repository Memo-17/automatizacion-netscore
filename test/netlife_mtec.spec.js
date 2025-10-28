import { test, expect } from '@playwright/test';
import { config } from '../config/env.config.js';

  const month = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ]
  
  test('Flujo completo de calificación NL_MTEC', async ({ page }) => {

    await page.goto(config.baseUrl);
    await page.getByRole('textbox', { name: 'Ingrese su usuario' }).click();
    await page.getByRole('textbox', { name: 'Ingrese su usuario' }).fill(config.username);
    await page.getByRole('textbox', { name: 'Ingrese su contraseña' }).click();
    await page.getByRole('textbox', { name: 'Ingrese su contraseña' }).fill(config.password);
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();
    await page.getByRole('link', { name: ' Calificaciones' }).click();
    await page.getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByRole('option', { name: 'NETLIFE - MTEC' }).click();
    console.log('Seleccionado el módulo NETLIFE - MTEC');
    await page.locator('p-dropdown').filter({ hasText: 'Buscar agente' }).getByLabel('dropdown trigger').click();
    
   if(await page.getByText('No results found')) {
      console.log('\n ---- No se encontraron agentes disponibles para calificar ---- \n');
      return;
    }

    await page.getByRole('option', { name: 'NO RESULTS FOUND' }).locator('div').first().click();
    console.log('Agente seleccionado con éxito');
    
    await page.locator('app-main-header button').click();
  
    for (const m of month) {
      const monthText = await page.getByText(m, { exact: true });
      if (await monthText.isEnabled()) {
        const className = await monthText.getAttribute('class');
        if (className && className.includes('p-disabled ng-star-inserted')) {
          continue;
        }
        await monthText.click();
        break;
      }
    }

    await page.locator('app-form-header p-calendar').getByRole('button').click();
    await page.locator('(//span[@draggable=\'false\'])[25]').click();
    await page.locator('(//input[@formcontrolname=\'valueKey\'])[6]').fill('prueba_login');
    await page.locator('(//input[@formcontrolname=\'valueKey\'])[7]').fill('123456789');
    await page.locator('#solucion').getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByRole('option', { name: 'Excelente' }).click();
    await page.getByRole('textbox', { name: 'Escribe un comentario' }).fill('comentario_pruebas');
    await page.getByRole('button', { name: ' Guardar' }).click();
    await page.getByRole('button', { name: 'Sí' }).click();
    console.log('Guardada la calificación 1');
  
    // Calificación 2
    await page.locator('app-form-header p-calendar').getByRole('button').click();
    await page.locator('(//span[@draggable=\'false\'])[25]').click();
    await page.locator('(//input[@formcontrolname=\'valueKey\'])[6]').fill('prueba_login');
    await page.locator('(//input[@formcontrolname=\'valueKey\'])[7]').fill('123456789');
    await page.locator('#solucion').getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByRole('option', { name: 'Excelente' }).click();
    await page.getByRole('textbox', { name: 'Escribe un comentario' }).fill('comentario_pruebas');
    await page.getByRole('button', { name: ' Guardar' }).click();
    await page.getByRole('button', { name: 'Sí' }).click();
    console.log('Guardada la calificación 2');
  
    // Calificación 3
    await page.locator('app-form-header p-calendar').getByRole('button').click();
    await page.locator('(//span[@draggable=\'false\'])[25]').click();
    await page.locator('(//input[@formcontrolname=\'valueKey\'])[6]').fill('prueba_login');
    await page.locator('(//input[@formcontrolname=\'valueKey\'])[7]').fill('123456789');
    await page.locator('#solucion').getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByRole('option', { name: 'Excelente' }).click();
    await page.getByRole('textbox', { name: 'Escribe un comentario' }).fill('comentario_pruebas');
    await page.getByRole('button', { name: ' Guardar' }).click();
    await page.getByRole('button', { name: 'Sí' }).click();
    console.log('Guardada la calificación 3');
  
    // Calificación 4
    await page.locator('app-form-header p-calendar').getByRole('button').click();
    await page.locator('(//span[@draggable=\'false\'])[25]').click();
    await page.locator('(//input[@formcontrolname=\'valueKey\'])[6]').fill('prueba_login');
    await page.locator('(//input[@formcontrolname=\'valueKey\'])[7]').fill('123456789');
    await page.locator('#solucion').getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByRole('option', { name: 'Excelente' }).click();
    await page.getByRole('textbox', { name: 'Escribe un comentario' }).fill('comentario_pruebas');
    await page.getByRole('button', { name: ' Guardar' }).click();
    await page.getByRole('button', { name: 'Sí' }).click();
    console.log('Guardada la calificación 4');
  
    // Calificación 5
    await page.locator('app-form-header p-calendar').getByRole('button').click();
    await page.locator('(//span[@draggable=\'false\'])[25]').click();
    await page.locator('(//input[@formcontrolname=\'valueKey\'])[6]').fill('prueba_login');
    await page.locator('(//input[@formcontrolname=\'valueKey\'])[7]').fill('123456789');
    await page.locator('#solucion').getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByRole('option', { name: 'Excelente' }).click();
    await page.getByRole('textbox', { name: 'Escribe un comentario' }).fill('comentario_pruebas');
    await page.getByRole('button', { name: ' Guardar' }).click();
    await page.getByRole('button', { name: 'Sí' }).click();
    const botonGuardarFinal = page.getByRole('button', { name: ' Guardar' });
    console.log('Guardada la calificación 5');
  });