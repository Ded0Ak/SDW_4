function rightCircularShift(arr: number[], n: number): number[] {
  let length = arr.length;

  if (length === 0) return [];

  let shift = n % length;
  let result: number[] = [];

  for (let i = 0; i < length; i++) {
    result.push(0);
  }

  for (let i = 0; i < length; i++) {
    let newIndex = (i + shift) % length;
    result[newIndex] = arr[i];
  }

  return result;
}


let listSize = 10;
let n = 3;

let originalList: number[] = [];

for (let i = 0; i < listSize; i++) {
  originalList.push(i + 1);
}

console.log("Початковий список:");
console.log(originalList);

let shiftedList = rightCircularShift(originalList, n);

console.log("\nСписок після зсуву на " + n + " позицій:");
console.log(shiftedList);
