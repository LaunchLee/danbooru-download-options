// ==UserScript==
// @name         DeepML Jump
// @namespace    https://github.com/LaunchLee/danbooru-download-options/
// @updateURL    https://raw.githubusercontent.com/LaunchLee/danbooru-download-options/refs/heads/main/unrelatives/deepml-jump.user.js
// @downloadURL  https://raw.githubusercontent.com/LaunchLee/danbooru-download-options/refs/heads/main/unrelatives/deepml-jump.user.js
// @version      2026.01.16.2
// @description  Jump to the first problem that is not solved.
// @author       Launch Lee
// @match        https://www.deep-ml.com/problems
// @icon         data:image/png;base64,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
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(function() {
    'use strict';

    let jump_to_id = GM_getValue("jump_to_id", 0);
    let jump_to_page = GM_getValue("jump_to_page", 0);
    let max_id = GM_getValue("max_id", 1);
    let max_page = GM_getValue("max_page", 1);
    let now_page = 1;

    let problems_listed = false;
    let listener_ready = false;
    let jump_appended = false;

    // -----------------------------
    // Hook fetch()
    // -----------------------------
    const target_script = document.createElement("script");
    target_script.textContent = `
        const targetPrefix = "https://api.deep-ml.com/user/";
        const problemsUrl = "https://api.deep-ml.com/list-problems";
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
                            window.dispatchEvent(new CustomEvent("GM-jump", { detail: data.solvedProblems }));
                        }
                    });
                }
                if (typeof url === "string" && url === problemsUrl) {
                    // clone response to read body
                    const clone = response.clone();
                    clone.json().then(data => {
                        if (data && data.problems) {
                            window.dispatchEvent(new CustomEvent("GM-problems", { detail: data.problems }));
                        }
                    });
                }
            } catch (e) {
                console.error("[ERROR] Fetch hook error:", e);
            }

            return response;
        };
    `
    document.documentElement.appendChild(target_script);

    function clickNext(n) {
        if (n > 0 && window.location.pathname == "/problems") {
            console.log("[INFO] Jump dst Problem:", jump_to_id, "Page:", jump_to_page);
            let next = document.querySelector("a[aria-label='Go to next page']");
            if (next) {
                for (let i = 0; i < n; i++) {
                    setTimeout(() => {
                        next.click();
                    }, 200 * i);
                }
                return true;
            }
        }
        return false;
    }

    function clickPrevious(n) {
        if (n > 0 && window.location.pathname == "/problems") {
            console.log("[INFO] Jump dst Problem:", jump_to_id, "Page:", jump_to_page);
            let previous = document.querySelector("a[aria-label='Go to previous page']");
            if (previous) {
                for (let i = 0; i < n; i++) {
                    setTimeout(() => {
                        previous.click();
                    }, 200 * i);
                }
                return true;
            }
        }
        return false;
    }

    function jumpToPage(self_count=0) {
        if (!listener_ready) {
            jump_appended = true;
            return;
        }
        let yet = false;
        if (now_page < jump_to_page) {
            yet = clickNext(jump_to_page - now_page);
        } else if (now_page > jump_to_page) {
            yet = clickPrevious(now_page - jump_to_page);
        } else {
            console.log("[INFO] Keep page");
            yet = true;
        }
        return yet;
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
        jump_to_id = jump_to_id > max_id ? max_id : jump_to_id;
        jump_to_page = Math.ceil(jump_to_id / 15);
        GM_setValue("jump_to_id", jump_to_id);
        GM_setValue("jump_to_page", jump_to_page);
        jumpToPage();
    }

    function searchMaxIdPage(problems) {
        max_id = Math.max(...problems.map((o) => {
            return Number(o.id);
        }));
        max_page = Math.ceil(max_id / 15);
        GM_setValue("max_id", max_id);
        GM_setValue("max_page", max_page);
    }

    function resetState() {
        now_page = 1;
        listener_ready = false;
        jump_appended = false;
    }


    window.addEventListener("GM-jump", (e) => {
        const solved_problems = e.detail;
        searchIdPage(solved_problems);
    });
    window.addEventListener("popstate", () => {
        resetState();
        jumpToPage();
    });

    const pushState = history.pushState;
    history.pushState = function() {
        pushState.apply(this, arguments);
        resetState();
        jumpToPage();
    };


    function aNowPage(n) {
        if (now_page != n && n > 0 && n <= max_page) {
            now_page = n;
            addPageListener();
        }
        console.log("[INFO] Now page:", now_page, "/", max_page);
    }

    function pageListener(e) {
        let el = e.target;
        let the_page = Number(el.textContent);
        aNowPage(the_page);
    }

    function previousListenser(e) {
        aNowPage(now_page - 1);
    }

    function nextListener(e) {
        aNowPage(now_page + 1);
    }

    function addPageListener() {
        const previous = document.querySelector("a[aria-label='Go to previous page']");
        const next = document.querySelector("a[aria-label='Go to next page']");
        if (previous || next) {
            previous.addEventListener("click", previousListenser);
            next.addEventListener("click", nextListener);
        }
        const li_first = previous?.closest("li");
        const li_final = next?.closest("li");
        let li_iter = li_first?.nextElementSibling;
        while (li_iter && li_iter != li_final) {
            let li_inner = li_iter.firstElementChild;
            if (li_inner && li_inner.tagName === "A") {
                li_inner.addEventListener("click", pageListener)
            }
            li_iter = li_iter?.nextElementSibling;
        }
        if ((previous || next) && !listener_ready) {
            listener_ready = true;
            if (jump_appended) {
                jumpToPage();
                jump_appended = false;
            }
        }
        if (!listener_ready && jump_appended) {
            setTimeout(addPageListener, 1000);
        }
    }


    window.addEventListener("GM-problems", (e) => {
        if (!problems_listed) {
            const problems = e.detail;
            searchMaxIdPage(problems);
            addPageListener();
        }
    });
})();
