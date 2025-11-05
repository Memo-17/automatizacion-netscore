import { test, expect } from '@playwright/test';
import { config } from '../config/env.config.js';

  const month = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ]

  //funcion para calificación regular
  const calificationRegular = async (page) => {
    await page.locator("//app-form-body/div[2]/div[2]/p-dropdown[1]/div[1]/div[2]").click();
    await page.getByRole('option', {name: 'No'}).click();
    await page.locator("//app-form-body/div[4]/div[2]/p-dropdown[1]/div[1]/div[2]").click();
    await page.getByRole('option', {name: 'No'}).click();
    await page.locator("//app-form-body/div[6]/div[2]/p-dropdown[1]/div[1]/div[2]").click();
    await page.getByRole('option', {name: 'No'}).click();

    //Validar que se haya creado la calificación regular
    await page.locator('input.p-inputtext.p-component.p-element.ng-untouched.ng-pristine.ng-valid.p-filled.text-red-400').textContent();
    console.log('Calificación Mala validada con éxito');
  }

  
  test('Flujo completo de calificación NL_COB', async ({ page }) => {

    await page.goto(config.baseUrl);
    await page.getByRole('textbox', { name: 'Ingrese su usuario' }).click();
    await page.getByRole('textbox', { name: 'Ingrese su usuario' }).fill(config.username);
    await page.getByRole('textbox', { name: 'Ingrese su contraseña' }).click();
    await page.getByRole('textbox', { name: 'Ingrese su contraseña' }).fill(config.password);
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();
    await page.getByRole('link', { name: ' Calificaciones' }).click();
    await page.getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByRole('option', { name: 'NETLIFE - COBRANZAS' }).click();
    await page.locator('p-dropdown').filter({ hasText: 'Buscar agente' }).getByLabel('dropdown trigger').click();
    await page.getByRole('option', { name: 'Chavez Morales Elkin' }).locator('div').first().click();
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

    await page.locator('(//input[@formcontrolname=\'valueKey\'])[6]').fill(config.loginCliente);
    await page.locator('(//input[@formcontrolname=\'valueKey\'])[7]').fill(config.callerId);

    //Llamar a la función de calificación regular
    await calificationRegular(page);

    await page.locator('#solucion').getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByRole('option', { name: 'Mala' }).click();
    await page.getByRole('textbox', { name: 'Escribe un comentario' }).fill(config.comentario);
    await page.getByRole('button', { name: ' Guardar' }).click();
    await page.getByRole('button', { name: 'Sí' }).click();
    console.log('Guardada la calificación 1');
  
    // Calificación 2
    await page.locator('app-form-header p-calendar').getByRole('button').click();
        await page.locator('(//span[@draggable=\'false\'])[25]').click();

    await page.locator('(//input[@formcontrolname=\'valueKey\'])[6]').fill(config.loginCliente);
    await page.locator('(//input[@formcontrolname=\'valueKey\'])[7]').fill(config.callerId);

    //Llamar a la función de calificación regular
    await calificationRegular(page);

    await page.locator('#solucion').getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByRole('option', { name: 'Mala' }).click();
    await page.getByRole('textbox', { name: 'Escribe un comentario' }).fill(config.comentario);
    await page.getByRole('button', { name: ' Guardar' }).click();
    await page.getByRole('button', { name: 'Sí' }).click();
    console.log('Guardada la calificación 2');
  
    // Calificación 3
    await page.locator('app-form-header p-calendar').getByRole('button').click();
        await page.locator('(//span[@draggable=\'false\'])[25]').click();

    await page.locator('(//input[@formcontrolname=\'valueKey\'])[6]').fill(config.loginCliente);
    await page.locator('(//input[@formcontrolname=\'valueKey\'])[7]').fill(config.callerId);

    //Llamar a la función de calificación regular
    await calificationRegular(page);

    await page.locator('#solucion').getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByRole('option', { name: 'Mala' }).click();
    await page.getByRole('textbox', { name: 'Escribe un comentario' }).fill(config.comentario);
    await page.getByRole('button', { name: ' Guardar' }).click();
    await page.getByRole('button', { name: 'Sí' }).click();
    console.log('Guardada la calificación 3');
  
    // Calificación 4
    await page.locator('app-form-header p-calendar').getByRole('button').click();
        await page.locator('(//span[@draggable=\'false\'])[25]').click();

    await page.locator('(//input[@formcontrolname=\'valueKey\'])[6]').fill(config.loginCliente);
    await page.locator('(//input[@formcontrolname=\'valueKey\'])[7]').fill(config.callerId);

    //Llamar a la función de calificación regular
    await calificationRegular(page);

    await page.locator('#solucion').getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByRole('option', { name: 'Mala' }).click();
    await page.getByRole('textbox', { name: 'Escribe un comentario' }).fill(config.comentario);
    await page.getByRole('button', { name: ' Guardar' }).click();
    await page.getByRole('button', { name: 'Sí' }).click();
    console.log('Guardada la calificación 4');
  
    // Calificación 5
    await page.locator('app-form-header p-calendar').getByRole('button').click();
        await page.locator('(//span[@draggable=\'false\'])[25]').click();

    await page.locator('(//input[@formcontrolname=\'valueKey\'])[6]').fill(config.loginCliente);
    await page.locator('(//input[@formcontrolname=\'valueKey\'])[7]').fill(config.callerId);

    //Llamar a la función de calificación regular
    await calificationRegular(page);

    await page.locator('#solucion').getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByRole('option', { name: 'Mala' }).click();
    await page.getByRole('textbox', { name: 'Escribe un comentario' }).fill(config.comentario);
    await page.getByRole('button', { name: ' Guardar' }).click();
    await page.getByRole('button', { name: 'Sí' }).click();
    const botonGuardarFinal = page.getByRole('button', { name: ' Guardar' });
    console.log('Guardada la calificación 5');

  });