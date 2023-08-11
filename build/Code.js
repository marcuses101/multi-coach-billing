"use strict";

// src/module.ts
function printThis(input) {
  console.log(input);
}

// src/index.ts
function main() {
  console.log("this is a test");
  let test = "true";
  printThis(test);
}
