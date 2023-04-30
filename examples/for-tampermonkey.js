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

(async function() {
    'use strict';
    const URL = 'https://raw.githubusercontent.com/AndreaDusza/teletal-assistant/master/dist/index.js';

    const resp = await fetch(URL);
    if (!resp.ok) {
        throw new Error(`Download error ${resp.status} (${resp.statusText}): ${await resp.text()}`);
    }

    const script = await resp.text();
    eval(script);
})().catch(x => {
    alert(`Asszisztens betöltése sikertelen`);
    console.error(`Asszisztens betöltése sikertelen`, x);
});
