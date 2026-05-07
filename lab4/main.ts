// Лабораторна роборта №4, Варіант №8
/// <reference types="node" />
import * as fs from "fs";
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question: string): Promise<string> {
  return new Promise((resolve) => rl.question(question, resolve));
}

function transformLine(line: string): string {
  return line.replace(/\b\w+\b/g, (word) =>
    word.length > 2 ? word.toUpperCase() : word
  );
}

async function main() {
  const inputPath = (await ask("Введіть шлях до вхідного файлу: ")).trim();
  const outputPath = (await ask("Введіть шлях до вихідного файлу: ")).trim();

  console.log("Відкриття файлу:", inputPath);

  try {
    const data = fs.readFileSync(inputPath, "utf8");
    console.log("Файл прочитано, обробка...");

    const lines = data.split(/\r?\n/);
    const outLines = lines.map(transformLine);

    fs.writeFileSync(outputPath, outLines.join("\n"), "utf8");

    console.log("Готово. Результат записано у файл:", outputPath);
  } catch (err: any) {
    console.error("Помилка:", err.message);
  } finally {
    rl.close();
  }
}

main();