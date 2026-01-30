import * as fs from 'fs';
import * as path from 'path';

// Leer las variables de entorno
const apiUrlProd = process.env.API_URL_PROD || 'http://default-prod-url/';
const apiUrlLocal = process.env.API_URL_LOCAL || 'http://default-local-url/';
const nameStore = process.env.NAME_STORE || 'Default Store';
const logo = process.env.LOGO || 'assets/images/logo/default-logo.png';
const codeClient = process.env.CODE_CLIENT || 'DEFAULT_CODE';

// Ruta del archivo environment.ts
const environmentFilePath = path.join(__dirname, 'src', 'environments', 'environment.ts');

// Leer el contenido actual de environment.ts
const environmentFile = fs.readFileSync(environmentFilePath, 'utf8');

// Reemplazar los valores por las variables de entorno
const updatedEnvironmentFile = environmentFile
  .replace('API_URL_PROD_PLACEHOLDER', apiUrlProd)
  .replace('API_URL_LOCAL_PLACEHOLDER', apiUrlLocal)
  .replace('NAME_STORE_PLACEHOLDER', nameStore)
  .replace('LOGO_PLACEHOLDER', logo)
  .replace('CODE_CLIENT_PLACEHOLDER', codeClient);

// Escribir el archivo con las nuevas configuraciones
fs.writeFileSync(environmentFilePath, updatedEnvironmentFile);

console.log('Environment variables updated in environment.ts');
