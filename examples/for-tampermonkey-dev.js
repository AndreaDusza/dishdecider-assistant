// ==UserScript==
// @name         DishDecider Assistant Dev
// @namespace    https://github.com/AndreaDusza/dishdecider-assistant
// @version      0.1
// @description  Indicate unwanted and favorite foods or ingredients
// @author       Andrea Dusza, Tamas Laszlo Hegedus, ChatGPT
// @match        https://www.teletal.hu/etlap*
// @match        https://pizzaforte.hu/*
// @match        https://wolt.com/*
// @match        https://app.ordit.hu/*
// @match        https://www.interfood.hu/etlap-es-rendeles/*
// @match        https://www.foodora.hu/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

const USER_CONFIGS = [];

(() => {
  'use strict';
  localStorage.setItem('dishdecider-assistant-config', JSON.stringify(USER_CONFIGS));
  const URL_DEV = 'http://localhost:8078/index.js';
  const URL = URL_DEV;

  /* Troubleshooting:

    Alternative URL:
    const URL = 'https://tokeletesosszhang.hu/dishdecider/index.js';
    
    Require jQuery in the header:
    // @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js  

  */

  main().catch(error => {
    alert(`Failed to load DishDecider Assistant`);
    console.error(`Failed to load DishDecider Assistant`, error);
  });

  async function main() {
    const devScript = await fetchGet(URL);
    eval(devScript);
    for (; ;) {
      await sleep(1000);
      const newScript = await fetchGet(URL);
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
