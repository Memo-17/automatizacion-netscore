import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import readline from "node:readline";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const testDir = path.resolve(projectRoot, "test");

// Detecta automáticamente los archivos .spec.js (máx. 14)
function discoverSpecs() {
  if (!fs.existsSync(testDir)) return [];
  const files = fs.readdirSync(testDir).filter((f) => f.endsWith(".spec.js"));
  files.sort((a, b) => a.localeCompare(b));
  return files.slice(0, 14);
}

function buildOptionMap(specFiles) {
  const map = {};
  for (let i = 0; i < 14; i++) {
    map[i + 1] = specFiles[i] || "";
  }
  return map;
}

function printMenu(optionToSpec) {
  console.log("================ MENÚ DE PRUEBAS ================");
  for (let i = 1; i <= 14; i++) {
    const spec = optionToSpec[i] || "(sin asignar)";
    console.log(`${String(i).padStart(2, " ")}) ${spec || "(sin asignar)"}`);
  }
  console.log(" q) Salir");
  console.log("==================================================");
}

function runPlaywright(specRelativePath) {
  return new Promise((resolve) => {
    const child = spawn("npx", ["playwright", "test", specRelativePath], {
      cwd: projectRoot,
      stdio: "inherit",
    });
    child.on("close", (code) => resolve(code));
  });
}

async function main() {
  const specFiles = discoverSpecs();
  const optionToSpec = buildOptionMap(specFiles);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const question = (q) => new Promise((res) => rl.question(q, res));

  printMenu(optionToSpec);
  const answer = (await question("Elige una opción (1-14) o q para salir: "))
    .trim()
    .toLowerCase();

  if (answer === "q") {
    rl.close();
    process.exit(0);
    return;
  }

  const choice = Number(answer);
  if (!Number.isInteger(choice) || choice < 1 || choice > 14) {
    console.error("Opción no válida.");
    rl.close();
    process.exit(1);
    return;
  }

  const specName = optionToSpec[choice];
  if (!specName) {
    console.error(`La opción ${choice} no tiene un .spec asignado.`);
    rl.close();
    process.exit(1);
    return;
  }

  const specPath = path.join(testDir, specName);
  if (!fs.existsSync(specPath)) {
    console.error(
      `El archivo no existe: ${path.relative(projectRoot, specPath)}`
    );
    rl.close();
    process.exit(1);
    return;
  }

  console.log(`Ejecutando: ${path.relative(projectRoot, specPath)}\n`);
  const code = await runPlaywright(path.relative(projectRoot, specPath));
  rl.close();
  process.exit(code ?? 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
