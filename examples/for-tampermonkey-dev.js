// ==UserScript==
// @name         Teletal Assistant Dev
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
    const URL = 'http://localhost:8078/index.js';

    let oldScript = undefined;
    for (;;) {
        const resp = await fetch(URL);
        if (!resp.ok) {
            throw new Error(`Download error ${resp.status} (${resp.statusText}): ${await resp.text()}`);
        }

        const newScript = await resp.text();

        if (oldScript === undefined) {
            // eslint-disable-next-line no-eval
            eval(newScript);
            oldScript = newScript;
        } else if (newScript !== oldScript) {
            location.reload();
            return;
        }
        await sleep(1000);
    }

    async function sleep(delay) {
        return new Promise(resolve => {
            setTimeout(resolve, delay);
        });
    }
})().catch(error => {
    alert(`Failed to load Teletál Assistant: ${error}`);
});
