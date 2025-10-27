# Automatización de Calificaciones - Netscore

Este proyecto contiene un flujo de prueba automatizado usando [Playwright](https://playwright.dev/) para evaluar el proceso de calificación en la plataforma Netscore.

## 📁 Archivo de prueba

El archivo principal del flujo se encuentra en:

test/flujoPrueba1.spec.js

## 🛠️ Cómo personalizar el flujo

1. **Descargue y edite** el archivo `.spec.js` según las condiciones o criterios de calificación que desee automatizar.
2. Asegúrese de tener instalado **Node.js** y **Playwright** en su entorno.
3. Guarde los cambios localmente.

## 🚀 Cómo subir los cambios a GitLab

Una vez modificados sus archivos, utilice los siguientes comandos para subirlos a su repositorio en GitLab:

```bash
git add test/flujoPrueba1.spec.js    # Reemplace con el nombre correcto si su archivo es distinto
git commit -m "Automatizar calificaciones Netscore"  # Mensaje representativo del commit
git push origin master               # Reemplace 'master' por la rama que esté usando si es otra


```
## 📊 Visualización de reportes de ejecución

Después de ejecutar el pipeline en GitLab:

1. Ingrese al pipeline correspondiente desde la sección CI/CD > Pipelines.
2. Haga clic sobre el Job que ejecutó las pruebas Playwright.
3. En el menú lateral izquierdo del job, ubique la sección Artifacts.
4. Allí encontrará la carpeta playwright-report/ para cada ejecución.

5. Descargue el archivo artifacts.zip, descomprímalo y abra el archivo index.html en su navegador para visualizar el reporte detallado de la prueba.
```
