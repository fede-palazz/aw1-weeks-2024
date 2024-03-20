"use strict";

function printStrings(strings) {
  for (const s of strings) {
    const len = s.length;
    if (len >= 2) {
      console.log(`${s.substring(0, 2)}${s.substring(len - 2)}`);
    } else console.log("");
  }
}

const s = ["spring", "it", "m", "cat"];
printStrings(s);
