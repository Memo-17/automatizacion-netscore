import { test, expect } from '@playwright/test';
import { config } from '../config/env.config.js';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

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
    await page.locator('(//span[@draggable=\'false\'])[25]').click();
    await page.locator('div:nth-child(7) > .flex > .p-inputtext').fill(config.loginCliente);
    await page.getByTitle('undefined').getByLabel('dropdown trigger').click();
    await page.getByRole('option', { name: 'Activar correo electronico' }).click();
    await page.locator('div:nth-child(9) > .flex > .p-inputtext').fill(config.callerId);

    //declarar variables
    let calificacionTexto = '';

    console.log('Ingrese la calificación deseada para la prueba del 1 al 3: \n 1. Aprobado \n 2. Regular \n 3. Mal');
    const rl = readline.createInterface({ input, output });

    //Leer la opción ingresada por consola
    const opcion = await rl.question('Ingrese su opción: ');
    rl.close();

    //Asignar texto según opción ingresada
    switch(opcion.trim()){
      case '1':
        calificacionTexto = 'Aprobado';
        break;
      case '2':
        calificacionTexto = 'Parcialmente Aprobado';
        break;
      case '3':
        calificacionTexto = 'Malo';
        break;
      default:
        console.log('Opción inválida. Se asignará "Malo" por defecto.');
        calificacionTexto = 'Malo';
    }

    //Tomar la opción ingresada por consola para el siguiente if
    if(calificacionTexto === 'Aprobado'){
      await page.locator('#solucion').getByRole('button', { name: 'dropdown trigger' }).click();
      await page.getByRole('option', { name: 'Excelente' }).click();
    }
    else if(calificacionTexto === 'Malo'){
      await page.locator('#solucion').getByRole('button', {name: 'dropdown trigger' }).click();
      await page.getByRole('option', { name: 'Mala' }).click();
    }

    await page.getByRole('textbox', { name: 'Escribe un comentario' }).fill(config.comentario);
    await page.getByRole('button', { name: ' Guardar' }).click();
    await page.getByRole('button', { name: 'Sí' }).click();
    console.log('Guardada la calificación 1');
  
    // Calificación 2
    await page.locator('app-form-header p-calendar').getByRole('button').click();
    await page.locator('(//span[@draggable=\'false\'])[25]').click();
    await page.locator('div:nth-child(7) > .flex > .p-inputtext').fill(config.loginCliente);
    await page.getByTitle('undefined').getByLabel('dropdown trigger').click();
    await page.getByRole('option', { name: 'Informacion de planes y' }).click();
    await page.locator('div:nth-child(9) > .flex > .p-inputtext').fill(config.callerId);
    await page.locator('#solucion').getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByRole('option', { name: 'Excelente' }).click();
    await page.getByRole('textbox', { name: 'Escribe un comentario' }).fill(config.comentario);
    await page.getByRole('button', { name: ' Guardar' }).click();
    await page.getByRole('button', { name: 'Sí' }).click();
    console.log('Guardada la calificación 2');
  
    // Calificación 3
    await page.locator('app-form-header p-calendar').getByRole('button').click();
    await page.locator('(//span[@draggable=\'false\'])[25]').click();
    await page.locator('div:nth-child(7) > .flex > .p-inputtext').fill(config.loginCliente);
    await page.getByTitle('undefined').getByLabel('dropdown trigger').click();
    await page.getByRole('option', { name: 'Reactivación de servicio' }).locator('div').first().click();
    await page.locator('div:nth-child(9) > .flex > .p-inputtext').fill(config.callerId);
    await page.locator('#solucion').getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByRole('option', { name: 'Excelente' }).click();
    await page.getByRole('textbox', { name: 'Escribe un comentario' }).fill(config.comentario);
    await page.getByRole('button', { name: ' Guardar' }).click();
    await page.getByRole('button', { name: 'Sí' }).click();
    console.log('Guardada la calificación 3');
  
    // Calificación 4
    await page.locator('app-form-header p-calendar').getByRole('button').click();
    await page.locator('(//span[@draggable=\'false\'])[25]').click();
    await page.locator('div:nth-child(7) > .flex > .p-inputtext').fill(config.loginCliente);
    await page.getByTitle('undefined').getByLabel('dropdown trigger').click();
    await page.getByText('Actualizar Datos', { exact: true }).click();
    await page.locator('div:nth-child(9) > .flex > .p-inputtext').fill(config.callerId);
    await page.locator('#solucion').getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByRole('option', { name: 'Excelente' }).click();
    await page.getByRole('textbox', { name: 'Escribe un comentario' }).fill(config.comentario);
    await page.getByRole('button', { name: ' Guardar' }).click();
    await page.getByRole('button', { name: 'Sí' }).click();
    console.log('Guardada la calificación 4');
  
    // Calificación 5
    await page.locator('app-form-header p-calendar').getByRole('button').click();
    await page.locator('(//span[@draggable=\'false\'])[25]').click();
    await page.locator('div:nth-child(7) > .flex > .p-inputtext').fill(config.loginCliente);
    await page.getByTitle('undefined').getByLabel('dropdown trigger').click();
    await page.getByText('Retencion de cliente').click();
    await page.locator('div:nth-child(9) > .flex > .p-inputtext').fill(config.callerId);
    await page.locator('#solucion').getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByRole('option', { name: 'Excelente' }).click();
    await page.getByRole('textbox', { name: 'Escribe un comentario' }).fill(config.comentario);
    await page.getByRole('button', { name: ' Guardar' }).click();
    await page.getByRole('button', { name: 'Sí' }).click();
    const botonGuardarFinal = page.getByRole('button', { name: ' Guardar' });
    console.log('Guardada la calificación 5');
  });