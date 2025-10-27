import { test, expect } from '@playwright/test';
import { config } from '../config/env.config.js';

  const month = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ]
  
  test('Flujo completo de calificación NL_CSI', async ({ page }) => {

    await page.goto(config.baseUrl);
    await page.getByRole('textbox', { name: 'Ingrese su usuario' }).click();
    await page.getByRole('textbox', { name: 'Ingrese su usuario' }).fill(config.username);
    await page.getByRole('textbox', { name: 'Ingrese su contraseña' }).click();
    await page.getByRole('textbox', { name: 'Ingrese su contraseña' }).fill(config.password);
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();
    await page.getByRole('link', { name: ' Calificaciones' }).click();
    await page.getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByRole('option', { name: 'NETLIFE - CSI' }).click();
    await page.locator('p-dropdown').filter({ hasText: 'Buscar agente' }).getByLabel('dropdown trigger').click();
    await page.getByRole('option', { name: 'Basantes Cadena Jordan' }).locator('div').first().click();
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
    await page.getByText('22', { exact: true }).click();
    await page.locator('div:nth-child(7) > .flex > .p-inputtext').fill('gdfghg');
    await page.getByTitle('undefined').getByLabel('dropdown trigger').click();
    await page.getByRole('option', { name: 'Activar correo electronico' }).click();
    await page.locator('div:nth-child(9) > .flex > .p-inputtext').fill('35465346');
    await page.locator('#solucion').getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByRole('option', { name: 'Excelente' }).click();
    await page.getByRole('textbox', { name: 'Escribe un comentario' }).fill('sdgdgf');
    await page.getByRole('button', { name: ' Guardar' }).click();
    await page.getByRole('button', { name: 'Sí' }).click();
    console.log('Guardada la calificación 1');
  
    // Calificación 2
    await page.locator('app-form-header p-calendar').getByRole('button').click();
    await page.getByText('22', { exact: true }).click();
    await page.locator('div:nth-child(7) > .flex > .p-inputtext').fill('dggdg');
    await page.getByTitle('undefined').getByLabel('dropdown trigger').click();
    await page.getByRole('option', { name: 'Informacion de planes y' }).click();
    await page.locator('div:nth-child(9) > .flex > .p-inputtext').fill('53535');
    await page.locator('#solucion').getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByRole('option', { name: 'Excelente' }).click();
    await page.getByRole('textbox', { name: 'Escribe un comentario' }).fill('gsgdg');
    await page.getByRole('button', { name: ' Guardar' }).click();
    await page.getByRole('button', { name: 'Sí' }).click();
    console.log('Guardada la calificación 2');
  
    // Calificación 3
    await page.locator('app-form-header p-calendar').getByRole('button').click();
    await page.getByText('22', { exact: true }).click();
    await page.locator('div:nth-child(7) > .flex > .p-inputtext').fill('gdfhdfh');
    await page.getByTitle('undefined').getByLabel('dropdown trigger').click();
    await page.getByRole('option', { name: 'Reactivación de servicio' }).locator('div').first().click();
    await page.locator('div:nth-child(9) > .flex > .p-inputtext').fill('2425');
    await page.locator('#solucion').getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByRole('option', { name: 'Excelente' }).click();
    await page.getByRole('textbox', { name: 'Escribe un comentario' }).fill('ggdrgd');
    await page.getByRole('button', { name: ' Guardar' }).click();
    await page.getByRole('button', { name: 'Sí' }).click();
    console.log('Guardada la calificación 3');
  
    // Calificación 4
    await page.locator('app-form-header p-calendar').getByRole('button').click();
    await page.getByText('22', { exact: true }).click();
    await page.locator('div:nth-child(7) > .flex > .p-inputtext').fill('gdfghdg');
    await page.getByTitle('undefined').getByLabel('dropdown trigger').click();
    await page.getByText('Actualizar Datos', { exact: true }).click();
    await page.locator('div:nth-child(9) > .flex > .p-inputtext').fill('3543634');
    await page.locator('#solucion').getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByRole('option', { name: 'Excelente' }).click();
    await page.getByRole('textbox', { name: 'Escribe un comentario' }).fill('dgdg');
    await page.getByRole('button', { name: ' Guardar' }).click();
    await page.getByRole('button', { name: 'Sí' }).click();
    console.log('Guardada la calificación 4');
  
    // Calificación 5
    await page.locator('app-form-header p-calendar').getByRole('button').click();
    await page.getByText('22', { exact: true }).click();
    await page.locator('div:nth-child(7) > .flex > .p-inputtext').fill('dggdfd');
    await page.getByTitle('undefined').getByLabel('dropdown trigger').click();
    await page.getByText('Retencion de cliente').click();
    await page.locator('div:nth-child(9) > .flex > .p-inputtext').fill('243252345');
    await page.locator('#solucion').getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByRole('option', { name: 'Excelente' }).click();
    await page.getByRole('textbox', { name: 'Escribe un comentario' }).fill('gdhgdrh');
    await page.getByRole('button', { name: ' Guardar' }).click();
    await page.getByRole('button', { name: 'Sí' }).click();
    const botonGuardarFinal = page.getByRole('button', { name: ' Guardar' });
    console.log('Guardada la calificación 5');
  });