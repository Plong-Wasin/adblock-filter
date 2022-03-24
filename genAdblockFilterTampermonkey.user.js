// ==UserScript==
// @name         Generate Adblock Filter
// @namespace    https://github.com/Plong-Wasin
// @version      0.1.0
// @description  Generate Adblock Filter
// @author       Plong-Wasin
// @match        *
// @updateURL    https://github.com/Plong-Wasin/adblock-filter/raw/main/genAdblockFilterTampermonkey.user.js
// @downloadURL  https://github.com/Plong-Wasin/adblock-filter/raw/main/genAdblockFilterTampermonkey.user.js
// @grant    GM_setClipboard
// @grant    GM_registerMenuCommand
// ==/UserScript==

"use strict";
(() => {
    function ready(fn) {
        if (document.readyState != "loading") {
            fn();
        }
        else {
            document.addEventListener("DOMContentLoaded", fn);
        }
    }
    function run() {
        const currentHost = new URL(location.href).host;
        let elements = document.querySelectorAll(`a[target="_blank"],a[rel="nofollow"]`);
        // filter offsetwidth != 0
        elements = Array.from(elements).filter((element) => element.offsetWidth != 0);
        // unique
        elements = Array.from(new Set(elements));
        let str = "";
        const exceptHost = ["www.facebook.com", "bit.ly"];
        elements.forEach((el) => {
            const url = new URL(el.href);
            const host = url.hostname;
            if (host !== currentHost && !exceptHost.includes(host)) {
                str = `${str}\n##a[href*="${host}"i]`;
            }
            else if (host === "bit.ly") {
                str = `${str}\n##a[href*="${host}${url.pathname}"i]`;
            }
        });
        GM_setClipboard(str);
    }
    ready(() => {
        GM_registerMenuCommand("Copy Adblock Filter", run);
    });
})();
