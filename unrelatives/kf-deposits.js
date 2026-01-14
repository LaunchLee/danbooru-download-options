// ==UserScript==
// @name         KF Deposits Count
// @namespace    http://github.com/LaunchLee/
// @version      2026.01.04.2
// @description  Make the game deposites count be minused at clicking.
// @author       Launch Lee
// @match        https://bbs.kfpromax.com/kf_fw_ig_mybp.php
// @icon         https://www.google.com/s2/favicons?sz=64&domain=kfpromax.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function waitOneSecond(element) {
        let text = element.innerText;
        element.style.pointerEvents = "none";
        element.innerText = text + "(1s)";
        setTimeout(() => {
            if (element) {
                element.innerText = text + "(0s)";
            }
        }, 1000);
        setTimeout(() => {
            if (element) {
                element.style.pointerEvents = "auto";
                element.innerText = text;
            }
        }, 1500);
    }

    let consecutive = false;

    function toggleConsecutive(elementC, elementB, elementA) {
        if (!consecutive) {
            elementA.textContent = "<";
            consecutive = true;
            consecutiveClick(elementC, elementB, elementA);
        } else {
            elementA.textContent = ">";
            consecutive = false;
        }
    }

    function consecutiveClick(elementC, elementB, elementA) {
        if (consecutive) {
            if (!elementC || !elementB) {
                toggleConsecutive(elementC, elementB, elementA);
            }
            let count_num = elementC.innerText;
            if (count_num > 0) {
                elementB.click();
                if (count_num > 1) {
                    setTimeout(() => {
                        consecutiveClick(elementC, elementB, elementA);
                    }, 2000);
                } else {
                    toggleConsecutive(elementC, elementB, elementA);
                }
            } else {
                toggleConsecutive(elementC, elementB, elementA);
            }
        }
    }

    const target_trs = document.getElementsByClassName("kf_fw_ig1")[0].getElementsByTagName("tr");
    const basic_spans = target_trs[1].getElementsByTagName("span");
    const count_spans = [...basic_spans].filter((_, i) => i % 2 === 1);
    const count_btns = target_trs[2].getElementsByTagName("a");
    for (let i = 0; i < count_btns.length; i++) {
        count_btns[i].addEventListener("click", (e) => {
            let count_num = count_spans[i].innerText;
            if (count_num > 0) {
                count_spans[i].innerText = count_num - 1;
                if (count_num > 1) {
                    waitOneSecond(count_btns[i]);
                }
            }
        });
        let consecutive_btn = document.createElement("button");
        consecutive_btn.type = "button";
        consecutive_btn.textContent = ">";
        consecutive_btn.addEventListener("click", (e) => {
            toggleConsecutive(count_spans[i], count_btns[i], consecutive_btn);
        });
        let column = count_btns[i].parentElement;
        column.style.position = "relative";
        consecutive_btn.style.position = "absolute";
        consecutive_btn.style.top = ".5em";
        consecutive_btn.style.right = ".5em";
        count_btns[i].insertAdjacentElement("afterend", consecutive_btn);
    }
})();
