// ==UserScript==
// @name         Teletal Assistant
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Indicate unwanted ingredients
// @author       You
// @match        https://www.teletal.hu/etlap*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

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
