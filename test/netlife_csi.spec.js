import { test, expect } from '@playwright/test';
import { config } from '../config/env.config.js';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { resolve } from 'node:path';

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

    //await page.pause();

    //declarar variables
    let calificacionTexto = '';
    
    console.log('Ingrese una opción de calificación:');
        console.log('1) Aprobado');
        console.log('2) Parcial');
        console.log('3) Malo');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    //const question = (q) => new Promise((res) => rl.question(q, res));

    async function askQuestion(query){
      return new Promise(resolve => rl.question(query, ans => resolve(ans)));
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    //const calificacion = (await question('Ingrese su opción (1-3): '));

    if (calificacion === '1') {
      calificacionTexto = 'Aprobado';
      console.log(calificacionTexto);
      rl.close(); 
    } else if (calificacion === '2') {
      calificacionTexto = 'Parcial';
      console.log(calificacionTexto);
      rl.close();
    } else if (calificacion === '3') {
      calificacionTexto = 'Malo';
      console.log(calificacionTexto);
      rl.close();
    } else {
      console.log('Opción inválida. Se asignará "Malo" por defecto.');
      calificacionTexto = 'Malo';
      rl.close();
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
    // await page.locator('app-form-header p-calendar').getByRole('button').click();
    // await page.locator('(//span[@draggable=\'false\'])[25]').click();
    // await page.locator('div:nth-child(7) > .flex > .p-inputtext').fill(config.loginCliente);
    // await page.getByTitle('undefined').getByLabel('dropdown trigger').click();
    // await page.getByRole('option', { name: 'Informacion de planes y' }).click();
    // await page.locator('div:nth-child(9) > .flex > .p-inputtext').fill(config.callerId);
    // await page.locator('#solucion').getByRole('button', { name: 'dropdown trigger' }).click();
    // await page.getByRole('option', { name: 'Excelente' }).click();
    // await page.getByRole('textbox', { name: 'Escribe un comentario' }).fill(config.comentario);
    // await page.getByRole('button', { name: ' Guardar' }).click();
    // await page.getByRole('button', { name: 'Sí' }).click();
    // console.log('Guardada la calificación 2');
  
    // // Calificación 3
    // await page.locator('app-form-header p-calendar').getByRole('button').click();
    // await page.locator('(//span[@draggable=\'false\'])[25]').click();
    // await page.locator('div:nth-child(7) > .flex > .p-inputtext').fill(config.loginCliente);
    // await page.getByTitle('undefined').getByLabel('dropdown trigger').click();
    // await page.getByRole('option', { name: 'Reactivación de servicio' }).locator('div').first().click();
    // await page.locator('div:nth-child(9) > .flex > .p-inputtext').fill(config.callerId);
    // await page.locator('#solucion').getByRole('button', { name: 'dropdown trigger' }).click();
    // await page.getByRole('option', { name: 'Excelente' }).click();
    // await page.getByRole('textbox', { name: 'Escribe un comentario' }).fill(config.comentario);
    // await page.getByRole('button', { name: ' Guardar' }).click();
    // await page.getByRole('button', { name: 'Sí' }).click();
    // console.log('Guardada la calificación 3');
  
    // // Calificación 4
    // await page.locator('app-form-header p-calendar').getByRole('button').click();
    // await page.locator('(//span[@draggable=\'false\'])[25]').click();
    // await page.locator('div:nth-child(7) > .flex > .p-inputtext').fill(config.loginCliente);
    // await page.getByTitle('undefined').getByLabel('dropdown trigger').click();
    // await page.getByText('Actualizar Datos', { exact: true }).click();
    // await page.locator('div:nth-child(9) > .flex > .p-inputtext').fill(config.callerId);
    // await page.locator('#solucion').getByRole('button', { name: 'dropdown trigger' }).click();
    // await page.getByRole('option', { name: 'Excelente' }).click();
    // await page.getByRole('textbox', { name: 'Escribe un comentario' }).fill(config.comentario);
    // await page.getByRole('button', { name: ' Guardar' }).click();
    // await page.getByRole('button', { name: 'Sí' }).click();
    // console.log('Guardada la calificación 4');
  
    // // Calificación 5
    // await page.locator('app-form-header p-calendar').getByRole('button').click();
    // await page.locator('(//span[@draggable=\'false\'])[25]').click();
    // await page.locator('div:nth-child(7) > .flex > .p-inputtext').fill(config.loginCliente);
    // await page.getByTitle('undefined').getByLabel('dropdown trigger').click();
    // await page.getByText('Retencion de cliente').click();
    // await page.locator('div:nth-child(9) > .flex > .p-inputtext').fill(config.callerId);
    // await page.locator('#solucion').getByRole('button', { name: 'dropdown trigger' }).click();
    // await page.getByRole('option', { name: 'Excelente' }).click();
    // await page.getByRole('textbox', { name: 'Escribe un comentario' }).fill(config.comentario);
    // await page.getByRole('button', { name: ' Guardar' }).click();
    // await page.getByRole('button', { name: 'Sí' }).click();
    // const botonGuardarFinal = page.getByRole('button', { name: ' Guardar' });
    // console.log('Guardada la calificación 5');
  });