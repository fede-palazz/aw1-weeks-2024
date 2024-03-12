//"use strict"; // I moduli JS funzionano in strict mode di default

//const dayjs = require("dayjs"); /* CommonJS */
import dayjs from "dayjs"; /* ES Modules */

let now = dayjs();
console.log(now.format("YYYY-MM-DD"));
