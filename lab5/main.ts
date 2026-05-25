/// <reference types="node" />
import * as readline from "readline";

interface Searchable {
  matches(query: string): boolean;
}

class City {
  public elements: City.InfrastructureElement[] = [];

  constructor(public name: string) {}

  addElement(element: City.InfrastructureElement) {
    this.elements.push(element);
  }

  search(query: string): City.InfrastructureElement[] {
    console.log(`Пошук елементів за запитом: "${query}"`);
    return this.elements.filter((e) => e.matches(query));
  }

  printAll() {
    console.log("\nІнфраструктура міста");
    console.table(
      this.elements.map((e) => ({
        Тип: e.type,
        Назва: e.name,
        Опис: e.description,
      }))
    );
  }
}

namespace City {
  export class InfrastructureElement implements Searchable {
    constructor(
      public type: "проспект" | "вулиця" | "площа",
      public name: string,
      public description: string
    ) {}

    matches(query: string): boolean {
      const q = query.toLowerCase();
      return (
        this.type.toLowerCase().includes(q) ||
        this.name.toLowerCase().includes(q) ||
        this.description.toLowerCase().includes(q)
      );
    }
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question: string): Promise<string> {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function readString(prompt: string): Promise<string> {
  while (true) {
    const value = (await ask(prompt)).trim();
    if (value) return value;
    console.log("Помилка: рядок не може бути порожнім.");
  }
}

async function readType(): Promise<"проспект" | "вулиця" | "площа"> {
  while (true) {
    const t = (await ask("Тип (проспект/вулиця/площа): ")).trim();
    if (t === "проспект" || t === "вулиця" || t === "площа") return t;
    console.log("Помилка: введіть один із варіантів: проспект, вулиця, площа.");
  }
}

function getTestData(): City {
  const city = new City("Львів");
  city.addElement(
    new City.InfrastructureElement("проспект", "Свободи", "Центральна частина")
  );
  city.addElement(
    new City.InfrastructureElement("вулиця", "Шевченка", "Житловий район")
  );
  city.addElement(
    new City.InfrastructureElement("площа", "Ринок", "Історичний центр")
  );
  city.addElement(
    new City.InfrastructureElement("вулиця", "Личаківська", "Стара магістраль")
  );
  city.addElement(
    new City.InfrastructureElement("проспект", "Чорновола", "Транспортна артерія")
  );
  return city;
}

async function readUserData(): Promise<City> {
  console.log("Ввід даних про місто");
  const cityName = await readString("Назва міста: ");
  const city = new City(cityName);

  const raw = (await ask("Кількість елементів (>=5): ")).trim();
  const count = Number(raw);
  const n = Math.max(5, isNaN(count) ? 5 : count);

  for (let i = 0; i < n; i++) {
    console.log(`\nЕлемент ${i + 1}`);
    const type = await readType();
    const name = await readString("Назва: ");
    const description = await readString("Опис: ");

    city.addElement(new City.InfrastructureElement(type, name, description));
    console.log("Елемент додано.");
  }

  return city;
}

async function main() {
  console.log("Оберіть режим:");
  console.log("1 - Ввести дані вручну");
  console.log("2 - Використати тестові дані");

  let mode = "";
  while (mode !== "1" && mode !== "2") {
    mode = (await ask("Ваш вибір (1/2): ")).trim();
  }

  const city = mode === "1" ? await readUserData() : getTestData();

  city.printAll();

  console.log("\nПошук");
  const query = await readString("Введіть рядок для пошуку: ");
  const result = city.search(query);

  if (result.length > 0) {
    console.log("\nРезультат пошуку");
    console.table(
      result.map((e) => ({
        Тип: e.type,
        Назва: e.name,
        Опис: e.description,
      }))
    );
  } else {
    console.log("Нічого не знайдено за заданим критерієм.");
  }

  rl.close();
}

main();