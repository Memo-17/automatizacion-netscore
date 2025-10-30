import readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

let calificacionTexto = '';

console.log('Ingrese una opción de calificación:');
    console.log('1) Aprobado');
    console.log('2) Parcial');
    console.log('3) Malo');

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    // const question = (q) => new Promise((res) => rl.question(q, res));

    // const calificacion = (await question('Ingrese su opción (1-3): '))

    async function askQuestion(query){
      return new Promise(resolve => rl.question(query, ans => resolve(ans)));
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    const calificacion = await askQuestion('Ingrese su opción (1-3): ');

    if (calificacion === '1') {
      calificacionTexto = 'Aprobado';
      console.log(calificacionTexto);
      rl.close(); 
      process.exit(0);
    } else if (calificacion === '2') {
      calificacionTexto = 'Parcial';
      console.log(calificacionTexto);
      rl.close();
      process.exit(0);
    } else if (calificacion === '3') {
      calificacionTexto = 'Malo';
      console.log(calificacionTexto);
      rl.close();
      process.exit(0);
    } else {
      console.log('Opción inválida. Se asignará "Malo" por defecto.');
      calificacionTexto = 'Malo';
      rl.close();
      process.exit(0);
    }