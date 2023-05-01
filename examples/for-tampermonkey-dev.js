// ==UserScript==
// @name         Teletal Assistant Dev
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Indicate unwanted and favorite foods or ingredients
// @author       Andrea Dusza, Tamas Laszlo Hegedus
// @match        https://www.teletal.hu/etlap*
// @match        https://pizzaforte.hu/*
// @match        https://wolt.com/*
// @match        https://app.ordit.hu/*
// @match        https://www.foodora.hu/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(() => {
  'use strict';
  const URL_DEV = 'http://localhost:8078/index.js';

  main().catch(error => {
    alert(`Teletál Asszisztens betöltése sikertelen`);
    console.error(`Failed to load Teletál Assistant`, error);
  });

  async function main() {
    const devScript = await fetchGet(URL_DEV);
    eval(devScript);
    for (; ;) {
      await sleep(1000);
      const newScript = await fetchGet(URL_DEV);
      if (newScript !== devScript) {
        location.reload();
        return;
      }
    }
  }

  async function fetchGet(url) {
    const resp = await fetch(url);
    if (!resp.ok) {
      throw new Error(`Download error ${resp.status} (${resp.statusText}): ${await resp.text()}`);
    }
    return await resp.text();
  }

  async function sleep(delay) {
    return new Promise(resolve => {
      setTimeout(resolve, delay);
    });
  }
})();
