#!/usr/bin/env node

const readline = require("readline");

processInput = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  let lines = [];
  rl.on("line", line => {
    // handle both cases of 1. line by line input and 2. piped input (e.g. echo "1\n1 M\n1 G" | node paint.js)
    line.split("\\n").forEach(l => lines.push(l));
  });

  rl.on("close", () => {
    let result = getResult(lines);
    if (result === -1) {
      process.stderr.write("No solution exists");
      rl.close();
      process.exit(1);
    } else {
      process.stdout.write(result);
      rl.close();
      process.exit();
    }
  });
};

getSortedCustomerObj = lines => {
  const customerObj = {};
  lines.forEach((line, person) => {
    let desiredPaints = line.split(" ");
    customerObj[person] = {};
    while (desiredPaints.length > 0) {
      let paint = desiredPaints.splice(0, 2);
      customerObj[person][paint[0]] = paint[1];
    }
  });

  // sort the customer object to consider customers with fewer request first
  // along with requests that are matte first (if same number of paints)
  let sortedCustomerObj = [];
  for (let customer in customerObj) {
    sortedCustomerObj.push([customer, customerObj[customer]]);
  }
  sortedCustomerObj.sort((a, b) => {
    if (Object.keys(a[1]).length === Object.keys(b[1]).length) {
      return Object.values(b[1])[0] < Object.values(a[1])[0]
        ? -1
        : Object.values(b[1])[0] > Object.values(a[1])[0]
        ? 1
        : 0;
    } else {
      return Object.keys(a[1]).length - Object.keys(b[1]).length;
    }
  });

  return sortedCustomerObj;
};

getResult = lines => {
  const numColors = lines.splice(0, 1);
  // prepare cheapestOutput arr (initialized as full of 'G')
  let cheapestOutput = Array(parseInt(numColors)).fill("G");
  // prepare sorted customerObj from lines
  let sortedCustomerObj = getSortedCustomerObj(lines);

  // go through each customer, comparing their paint requests with
  // our cheapest paint options
  for (customer in sortedCustomerObj) {
    let paints = sortedCustomerObj[customer][1];
    let satisfied = false;

    for (paintNumber in paints) {
      if (cheapestOutput[paintNumber - 1] === paints[paintNumber]) {
        // leave the loop since this customer already is satisfied
        satisfied = true;
        break;
      }
    }
    if (!satisfied) {
      // if they are not satisfied, only change a value from G to M
      let valueChanged = false;
      for (paintNumber in paints) {
        if (
          cheapestOutput[paintNumber - 1] !== paints[paintNumber] &&
          paints[paintNumber] === "M"
        ) {
          // change the cheapest output to consider a matte paint
          cheapestOutput[paintNumber - 1] = paints[paintNumber];
          valueChanged = true;
          break;
        }
      }
      if (!valueChanged) {
        // if we could not satisfy the customer, return -1
        return -1;
      }
    }
  }
  return cheapestOutput.join(" ");
};

processInput();
