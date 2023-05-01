// ==UserScript==
// @name         Teletal Assistant
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Indicate unwanted and favorite foods or ingredients
// @author       Andrea Dusza, Tamas Laszlo Hegedus
// @match        https://www.teletal.hu/etlap*
// @match        https://pizzaforte.hu/*
// @match        https://app.ordit.hu/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

localStorage.setItem('food-order-assistant-config', JSON.stringify([{
  userNamesToFind: ['John Doe'],
  blacklist: [],
  warnList: [],
  blacklistExceptions: [],
  mehList: ['tarhonya'],
  favList1: ['juhtúró', 'camembert', 'grillezett sajt', 'grill sajt', 'tápiókapuding', 'rák', 'lazac'],
  favList2: ['aszalt paradicsom'],
  testingList: [],
}]));

(() => {
  'use strict';
  const URL_PROD = 'https://raw.githubusercontent.com/AndreaDusza/teletal-assistant/master/dist/index.js';

  main().catch(error => {
    alert(`Teletál Asszisztens betöltése sikertelen`);
    console.error(`Failed to load Teletál Assistant`, error);
  });

  async function main() {
    eval(await fetchGet(URL_PROD));
  }

  async function fetchGet(url) {
    const resp = await fetch(url);
    if (!resp.ok) {
      throw new Error(`Download error ${resp.status} (${resp.statusText}): ${await resp.text()}`);
    }
    return await resp.text();
  }
})();
