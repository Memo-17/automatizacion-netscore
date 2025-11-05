import {test, expect} from '@playwright/test';
import {config} from '../config/env.config.js';
import readline from 'node:readline/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const month = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
]

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('Flujo completo de calificación CAVS', async ({page}) => {

    await page.goto(config.baseUrl);
    await page.getByRole('textbox', {name: 'Ingrese su usuario'}).click();
    await page.getByRole('textbox', {name: 'Ingrese su usuario'}).fill(config.username);
    await page.getByRole('textbox', {name: 'Ingrese su contraseña'}).click();
    await page.getByRole('textbox', {name: 'Ingrese su contraseña'}).fill(config.password);
    await page.getByRole('button', {name: 'Iniciar sesión'}).click();
    await page.getByText('Cavs/Distribuidores', { exact: true }).click();

    let nc = 0;
    while (nc < 5) {
        nc++;
    
        //Calificación
        await page.getByRole('button', {name: 'dropdown trigger'}).click();
        await page.getByRole('option', {name: 'Cavs'}).click();
        await page.locator('p-dropdown').filter({hasText: 'Buscar ciudad'}).getByLabel('dropdown trigger').click();
        await page.getByRole('option', {name: 'Guayaquil'}).locator('div').first().click();
        await page.locator('p-dropdown').filter({hasText: 'Buscar sucursal'}).getByLabel('dropdown trigger').click();
        await page.getByRole('option', {name: 'Riocentro Sur'}).locator('div').first().click();
        
        await page.locator('p-calendar').getByRole('button').click();
        for (const m of month) {
        const monthText = await page.getByText(m, { exact: true });
            if (await monthText.isEnabled()) {
                const className = await monthText.getAttribute("class");
                if (className && className.includes("p-disabled ng-star-inserted")) {
                    continue;
                }
                await monthText.click();
                break;
            }
        }

        await page.getByText('FLUJO DE ATENCIÓN', { exact: true }).click();
        let n = 0;
        while (n < 10) {
            n++;
            await page.locator(`body > app-root:nth-child(1) > app-layout:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > app-index:nth-child(2) > div:nth-child(1) > div:nth-child(1) > app-form:nth-child(1) > div:nth-child(2) > app-form-body:nth-child(3) > div:nth-child(1) > div:nth-child(1) > p-accordion:nth-child(1) > div:nth-child(1) > p-accordiontab:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(${n * 2}) > div:nth-child(2) > label:nth-child(1) > span:nth-child(3)`).click();
            await page.getByRole('textbox', { name: 'Escribe una observación' }).nth(n - 1).fill('Automatización Playwright ' + n);
        }

        await page.getByRole('textbox', { name: 'Observaciones' }).fill('Prueba_automatizada_Playwright ' + nc);
        await page.getByText('Cargar imagen', { exact: true }).click();

        // Cargar archivo sin abrir el explorador del sistema operativo
        const uploadPath = path.resolve(__dirname, '../resources/imagen_prueba.png');
        const fileInput = page.locator('input[type="file"]');

        // Asegura que el input exista (algunos componentes lo crean al hacer click)
        await fileInput.waitFor({ state: 'attached', timeout: 3000 }).catch(async () => {
        await page.getByRole('button', { name: 'Cargar imagen' }).click();
        await fileInput.waitFor({ state: 'attached', timeout: 5000 });
        });
        await fileInput.setInputFiles(uploadPath);
        await page.getByRole('button', { name: 'Subir imagen' }).click();

        //Validar que imagen se haya cargado correctamente
        await expect(page.getByText('La imagen fue subida con Éxito puedes guardar la calificación')).toBeVisible();

        await page.locator('p-button:has-text("Guardar")').click();
    }
});