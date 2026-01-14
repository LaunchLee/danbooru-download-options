// ==UserScript==
// @name         DeepML Jump
// @namespace    https://github.com/LaunchLee/danbooru-download-options/
// @updateURL    https://raw.githubusercontent.com/LaunchLee/danbooru-download-options/refs/heads/main/unrelatives/deepml-jump.user.js
// @downloadURL  https://raw.githubusercontent.com/LaunchLee/danbooru-download-options/refs/heads/main/unrelatives/deepml-jump.user.js
// @version      2026.01.12.2
// @description  Jump to the first problem that is not solved.
// @author       Launch Lee
// @match        https://www.deep-ml.com/problems
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAMAAADarb8dAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAVUExURQc1YD9ZbFVwjB5LbKy5x669yHWOnh0eppMAAAAHdElNRQfqAQwOIR5wswHGAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDI2LTAxLTEyVDE0OjI0OjM0KzAwOjAw33jjoQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyNi0wMS0xMlQxNDoyNDozNCswMDowMK4lWx0AAAAodEVYdGRhdGU6dGltZXN0YW1wADIwMjYtMDEtMTJUMTQ6MzM6MzArMDA6MDAuLZpoAAAAaElEQVQI13VPyw4DQQiSh/z/J5eY3aSH1sNECAIz82fA0RckvSTnIWMJkpiDwmbR2RingKsZ8SUkF2B2gyOylmMnnM0F7hjuw8l5yN0bUwUPa2vRVGfw9Dhc5+XbVPUAvrprkN7+/OUH0/UBrdvHSgsAAAAASUVORK5CYII=
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const targetPrefix = "https://api.deep-ml.com/user/";
    let jump_to_id = 0;
    let jump_to_page = 0;

    function clickNext(n) {
        if (n > 0 && window.location.pathname == "/problems") {
            console.log("[INFO] Problem:", jump_to_id, "Page:", jump_to_page);
            let next = document.querySelector("a[aria-label='Go to next page']");
            if (next) {
                for (let i = 0; i < n; i++) {
                    setTimeout(() => {
                        next.click();
                        console.log("[INFO] Next:", i + 1, "/", n, "time(s)");
                    }, 200 * i);
                }
            }
        }
    }

    function searchIdPage(solved_problems) {
        solved_problems.sort((a, b) => Number(a) - Number(b));
        jump_to_id = 1;
        for (let i = 0; i < solved_problems.length; i++) {
            if (solved_problems[i] == jump_to_id) {
                jump_to_id++;
            } else {
                break;
            }
        }
        jump_to_page = Math.ceil(jump_to_id / 15)
        clickNext(jump_to_page - 1);
    }

    function addNextClicker(timeout, self_count=0) {
        let table_active = document.querySelector("div[data-active='active']");
        if (self_count > 5) {
            // max retry 5 times
            return;
        }
        if (table_active && window.location.pathname == "/problems") {
            setTimeout(() => {
                clickNext(jump_to_page - 1);
            }, timeout);
        } else {
            setTimeout(() => {
                addNextClicker(timeout, self_count + 1);
            }, timeout);
        }
    }

    function addHistoryMonitor() {
        let react_time = 1000;
        // --- hook pushState ---
        const origPushState = history.pushState;
        history.pushState = function(...args) {
            const result = origPushState.apply(this, args);
            addNextClicker(react_time);
            return result;
        };

        // --- hook replaceState ---
        const origReplaceState = history.replaceState;
        history.replaceState = function(...args) {
            const result = origReplaceState.apply(this, args);
            addNextClicker(react_time);
            return result;
        };

        window.addEventListener("popstate", (e) => {
            addNextClicker(react_time);
        });
    }

    // -----------------------------
    // Hook fetch()
    // -----------------------------
    const origFetch = window.fetch;
    window.fetch = async function(...args) {
        const url = args[0];

        const response = await origFetch.apply(this, args);

        try {
            if (typeof url === "string" && url.startsWith(targetPrefix)) {
                // clone response to read body
                const clone = response.clone();
                clone.json().then(data => {
                    if (data && data.solvedProblems) {
                        searchIdPage(data.solvedProblems);
                        addHistoryMonitor();
                    }
                });
            }
        } catch (e) {
            console.error("[ERROR] Fetch hook error:", e);
        }

        return response;
    };
})();
