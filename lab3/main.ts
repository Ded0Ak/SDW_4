// Лабораторна роборта №3, Варіант №8
/// <reference types="node" />
import * as readline from "readline";

class Train {
  constructor(
    public destination: string,
    public trainNumber: number,
    public departureTime: string, 
    public seatsCommon: number,
    public seatsCoupe: number,
    public seatsPlatz: number,
    public seatsSV: number
  ) {}

  static hasCommonSeats(t: Train): boolean {
    return t.seatsCommon > 0;
  }

  static afterTime(t: Train, time: string): boolean {
    return toMinutes(t.departureTime) > toMinutes(time);
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question: string): Promise<string> {
  return new Promise((resolve) => rl.question(question, resolve));
}

function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function validateTime(input: string): boolean {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(input);
}

function printTable(trains: Train[], title: string) {
  console.log(`\n${title}`);
  console.table(
    trains.map((t) => ({
      Destination: t.destination,
      Number: t.trainNumber,
      Time: t.departureTime,
      Common: t.seatsCommon,
      Coupe: t.seatsCoupe,
      Platz: t.seatsPlatz,
      SV: t.seatsSV,
    }))
  );
}

async function readInt(prompt: string, min = 0): Promise<number> {
  while (true) {
    try {
      const raw = (await ask(prompt)).trim();
      const val = Number(raw);
      if (!Number.isInteger(val) || val < min) {
        throw new Error(`Потрібне ціле число >= ${min}`);
      }
      return val;
    } catch (e: any) {
      console.log("Помилка:", e.message);
    }
  }
}

async function readTime(prompt: string): Promise<string> {
  while (true) {
    try {
      const raw = (await ask(prompt)).trim();
      if (!validateTime(raw)) {
        throw new Error("Час має бути у форматі HH:MM (00:00–23:59)");
      }
      return raw;
    } catch (e: any) {
      console.log("Помилка:", e.message);
    }
  }
}

async function readString(prompt: string): Promise<string> {
  while (true) {
    try {
      const raw = (await ask(prompt)).trim();
      if (!raw) throw new Error("Рядок не може бути порожнім");
      return raw;
    } catch (e: any) {
      console.log("Помилка:", e.message);
    }
  }
}

function getTestData(): Train[] {
  return [
    new Train("Київ", 101, "08:15", 50, 20, 10, 5),
    new Train("Львів", 203, "13:40", 0, 30, 40, 10),
    new Train("Одеса", 305, "17:05", 25, 10, 15, 0),
    new Train("Харків", 407, "22:30", 0, 20, 25, 8),
    new Train("Київ", 509, "19:20", 60, 15, 10, 2),
  ];
}

async function readUserData(): Promise<Train[]> {
  const n = Math.max(5, await readInt("Введіть кількість поїздів (>=5): ", 5));
  const trains: Train[] = [];

  for (let i = 0; i < n; i++) {
    console.log(`\n--- Поїзд ${i + 1} ---`);
    const destination = await readString("Пункт призначення: ");
    const trainNumber = await readInt("Номер поїзда: ", 1);
    const departureTime = await readTime("Час відправлення (HH:MM): ");
    const seatsCommon = await readInt("К-ть загальних місць: ", 0);
    const seatsCoupe = await readInt("К-ть купе: ", 0);
    const seatsPlatz = await readInt("К-ть плацкарт: ", 0);
    const seatsSV = await readInt("К-ть СВ: ", 0);

    trains.push(
      new Train(
        destination,
        trainNumber,
        departureTime,
        seatsCommon,
        seatsCoupe,
        seatsPlatz,
        seatsSV
      )
    );
  }

  return trains;
}

async function main() {
  console.log("Оберіть режим:");
  console.log("1 - Ввести дані вручну");
  console.log("2 - Використати тестові дані");

  let mode = "";
  while (mode !== "1" && mode !== "2") {
    mode = (await ask("Ваш вибір (1/2): ")).trim();
  }

  const trains = mode === "1" ? await readUserData() : getTestData();

  printTable(trains, "Усі поїзди");

  // Завдання 1
  const withCommon = trains.filter(Train.hasCommonSeats);
  if (withCommon.length > 0) {
    printTable(withCommon, "Поїзди з загальними місцями");
  } else {
    console.log("\nНемає поїздів із загальними місцями.");
  }

  // Завдання 2
  const destSearch = await readString(
    "\nВведіть пункт призначення для пошуку: "
  );
  const timeSearch = await readTime(
    "Введіть час (HH:MM) — шукати після нього: "
  );
  console.log(
    `Параметри пошуку: пункт="${destSearch}", час після ${timeSearch}`
  );

  const result = trains.filter(
    (t) =>
      t.destination.toLowerCase() === destSearch.toLowerCase() &&
      Train.afterTime(t, timeSearch)
  );

  if (result.length > 0) {
    printTable(result, "Результат пошуку");
  } else {
    console.log("Немає поїздів за заданими критеріями.");
  }

  rl.close();
}

main();