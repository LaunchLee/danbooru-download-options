// ==UserScript==
// @name         DeepML Jump
// @namespace    https://github.com/LaunchLee/danbooru-download-options/
// @updateURL    https://raw.githubusercontent.com/LaunchLee/danbooru-download-options/refs/heads/main/unrelatives/deepml-jump.user.js
// @downloadURL  https://raw.githubusercontent.com/LaunchLee/danbooru-download-options/refs/heads/main/unrelatives/deepml-jump.user.js
// @version      2026.01.12.3
// @description  Jump to the first problem that is not solved.
// @author       Launch Lee
// @match        https://www.deep-ml.com/problems
// @icon         data:image/png;base64,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
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
        let react_time = 2000;
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
