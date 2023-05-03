// ==UserScript==
// @name         DishDecider Assistant
// @namespace    https://github.com/AndreaDusza/dishdecider-assistant
// @version      0.1
// @description  Indicate unwanted and favorite foods or ingredients
// @author       Andrea Dusza, Tamas Laszlo Hegedus, ChatGPT
// @match        https://www.teletal.hu/etlap*
// @match        https://pizzaforte.hu/*
// @match        https://app.ordit.hu/*
// @match        https://www.interfood.hu/etlap-es-rendeles/*
// @match        https://wolt.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

const USER_CONFIGS = [
  {
    userNamesToFind: ['Optional: Your Username Goes Here'],
    blacklist: ['beef', 'marha'],
    warnList: [],
    blacklistExceptions: [],
    mehList: [],
    favList1: ['chicken', 'csirk(e|é)'],
    favList2: ['onion', 'hagym(a|á)'],
    testingList: [],
  }
];

(() => {
  'use strict';
  localStorage.setItem('dishdecider-assistant-config', JSON.stringify(USER_CONFIGS));
  const URL_PROD = 'https://raw.githubusercontent.com/AndreaDusza/dishdecider-assistant/master/dist/index.js';

  main().catch(error => {
    alert(`Failed to load DishDecider Assistant`);
    console.error(`Failed to load DishDecider Assistant`, error);
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
