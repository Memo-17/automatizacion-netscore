import dotenv from 'dotenv';

// Consumir variables de entorno desde el archivo .env
dotenv.config();

export const config = {
  // Credenciales de autenticación
  username: process.env.NETSCORE_USERNAME,
  password: process.env.NETSCORE_PASSWORD,
  baseUrl: process.env.NETSCORE_URL,
  loginCliente: process.env.NETSCORE_LOGIN_CLIENTE,
  callerId: process.env.NETSCORE_CALLER_ID,
  comentario: process.env.NETSCORE_COMENTARIO,
  
  // Configuraciones adicionales (opcionales)
  timeout: parseInt(process.env.TIMEOUT) || 30000,
  retries: parseInt(process.env.RETRIES) || 3,
  headless: process.env.HEADLESS === 'true' || false,
};

// Validar que las variables críticas estén presentes
const requiredVars = ['username', 'password', 'baseUrl', 'loginCliente', 'callerId', 'comentario'];
const missingVars = requiredVars.filter(key => !config[key]);

if (missingVars.length > 0) {
  throw new Error(
    `Las siguientes variables de entorno son requeridas: ${missingVars.join(', ')}\n` +
    `Asegúrate de tener un archivo .env con las variables:\n` +
    `NETSCORE_USERNAME=tu_usuario\n` +
    `NETSCORE_PASSWORD=tu_password\n` +
    `NETSCORE_URL=https://172.24.80.51/netscore/#/auth/login\n` +
    `NETSCORE_LOGIN_CLIENTE=tu_login_cliente\n` +
    `NETSCORE_CALLER_ID=tu_caller_id\n` +
    `NETSCORE_COMENTARIO=tu_comentario\n`
  );
}