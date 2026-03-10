import { initApp } from "./ui.js";
import { getCountries } from "./service.js";

function start() {
    initApp(getCountries);
}

start();