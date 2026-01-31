// ==UserScript==
// @name         pixiv-you
// @namespace    https://github.com/LaunchLee/danbooru-download-options/
// @updateURL    https://raw.githubusercontent.com/LaunchLee/danbooru-download-options/refs/heads/main/unrelatives/pixiv-you.user.js
// @downloadURL  https://raw.githubusercontent.com/LaunchLee/danbooru-download-options/refs/heads/main/unrelatives/pixiv-you.user.js
// @version      2026.01.31.2
// @description  Specially mark authors from my download list.
// @author       Launch Lee
// @match        https://www.pixiv.net/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAADYUExURf///wCW+gWY+iWl+yyo+xyh+wua+huh+yin+wyb+j6w+93x/ur2/8np/kGx+4nO/b/k/trw/uX0/sLm/pDR/Um0+w6c+la5/P7+/6LZ/bPg/vP6//b7/7vj/k62/K3d/YzQ/RGd+qXa/Ref+pvW/ePz/vr9/2fB/GS//CKk+128/MTm/tTt/qnc/nLF/Duu++z3/7fh/k+2+2C9/JzW/YPM/LLf/Reg+tDr/n7K/GnB/Eu1/Dyv+9nv/nvJ/HXG/Kjb/TGq+1O4/O74/7zj/pbU/YTM/Tas+43BDQkAAAABdFJOUwBA5thmAAAAAWJLR0QAiAUdSAAAAAd0SU1FB+oBDgUYACJklnUAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjYtMDEtMTRUMDU6MTU6MjgrMDA6MDCxWtVjAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDI2LTAxLTE0VDA1OjE1OjI4KzAwOjAwwAdt3wAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyNi0wMS0xNFQwNToyNDowMCswMDowMJD4CCUAAAFZSURBVEjHvdbZcoIwFAZgohKhLHWpJCooKiCle9WudtG29v3fqDTBAadODrmo/xX553wXBAaiKDwIjFIMPL5Dyo3npPx8JmSBzDwTskBuPhWHBZVqTeVXuK5pqg6CI8O0tHTaPm40Wy2jfdJxxIBQSru63evTLK43qEDAHZq0kL4/AsCfjCeSgAa4DAgtK4z4ZTSFgRVXHec0OeOrcxUCF9nEJODrSwC069tiNGRFQxcCd5A3V9e/jVkTAquw8/iG3fatEIyLlc+qmRDMi9WCVVMhuCu+PnNWJUJgVPPm/oFtgy3e1se8eWJFUxUD83lbLA1WdIEHR8OY7SwmL/zBdCBAo/YrIW+ey1fvGAQ7MVZICphrJAVCgiDQd/PxyFsiEIxJL/sOfHzORggGAcKrZPEVbOLvPZ+yvUCUHbCWBerGT2OXB2UiD/7/H3eA/7T80UH+cCJ1/PkBXnM64c1nYQcAAAAASUVORK5CYII=
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(function () {
    'use strict';

    // Config button ==========================================================
    const config_btn = document.createElement('button');
    config_btn.textContent = "PY";
    config_btn.style.display = "inline-block";
    config_btn.style.position = "fixed";
    config_btn.style.left = "2em";
    config_btn.style.bottom = "3em";
    config_btn.style.padding = "1em";
    config_btn.style.cursor = "pointer";
    config_btn.style.color = "white";
    config_btn.style.backgroundColor = "#00000088";
    config_btn.style.borderRadius = "3em";
    config_btn.addEventListener("mouseenter", (ev) => {
        config_btn.style.backgroundColor = "#000000";
    });
    config_btn.addEventListener("mouseleave", (ev) => {
        config_btn.style.backgroundColor = "#00000088";
    });
    config_btn.addEventListener("mousedown", (ev) => {
        config_btn.style.backgroundColor = "#000000BB";
    });
    config_btn.addEventListener("mouseup", (ev) => {
        config_btn.style.backgroundColor = "#000000";
    });
    document.body.append(config_btn);

    // Config box =============================================================
    const config_box = document.createElement('div');
    config_box.style.maxWidth = "24em";
    config_box.style.display = "none";
    config_box.style.position = "fixed";
    config_box.style.left = "2em"
    config_box.style.bottom = "7em"
    config_box.style.padding = "1em";
    config_box.style.color = "white";
    config_box.style.backgroundColor = "black";
    config_box.style.border = ".1em solid black";
    config_box.style.borderRadius = "1em";
    document.body.append(config_box);

    // Config inputs ==========================================================
    const od_properties = {
        d_authors: GM_getValue("d_authors", ""),
        d_date: GM_getValue("d_date", "1970/01/01"),
        d_date_remark: GM_getValue("d_date_remark", "")
    };
    // With the same keys
    const input_composite = {
        d_authors: "Following",
        d_date: "Last Date",
        d_date_remark: "Last Title"
    };
    // For every value as list: [0]: <label>, [1]: <input>
    const input_elements = {
        d_authors: [],
        d_date: [],
        d_date_remark: []
    };
    for (const [key, value] of Object.entries(input_composite)) {
        let placeholder;
        let input;
        let label = document.createElement('label');
        switch (key) {
            case "d_authors":
                placeholder = "XXX, XXX, XXX";
                break;
            case "d_date_remark":
                placeholder = "Substring of title";
                break;
            default:
                placeholder = "";
        }
        if (key === "d_authors") {
            input = document.createElement('textarea');
            input.rows = "10";
            input.cols = "48";
        } else {
            input = document.createElement('input');
        }
        input.placeholder = placeholder;
        input.id = `pixiv-you-${key}`;
        input.value = od_properties[key];
        input.style.padding = ".2em .8em";
        input.style.borderRadius = "1em";
        label.htmlFor = input.id;
        label.textContent = `${value} `;
        label.style.display = "inline-block";
        label.style.width = "5em";
        input_elements[key].push(label);
        input_elements[key].push(input);
        if (key === "d_authors") {
            config_box.append(
                input_elements[key][0],
                document.createElement("br"),
                input_elements[key][1],
                document.createElement('hr')
            );
        } else {
            config_box.append(
                input_elements[key][0],
                input_elements[key][1],
                document.createElement('hr')
            );
        }
    }
    const config_box_tip = document.createElement('div');
    config_box_tip.style.display = "flex";
    config_box_tip.style.alignItems = "center";
    config_box_tip.style.justifyContent = "space-between";
    const tip_left = document.createElement('div');
    tip_left.style.display = "inline-block";
    tip_left.style.cursor = "default";
    tip_left.textContent = "Tip: Update on toggle.";
    const tip_right = document.createElement('div');
    tip_right.style.display = "inline-block";
    const remark_btn = document.createElement('button');
    remark_btn.textContent = "Remark";
    remark_btn.style.color = "white";
    remark_btn.style.backgroundColor = "#263238"
    remark_btn.style.display = "inline-block";
    remark_btn.style.cursor = "pointer";
    remark_btn.style.padding = ".5em";
    remark_btn.style.border = ".1em solid white";
    remark_btn.style.borderRadius = ".6em";
    remark_btn.onmouseenter = function(ev) {
        this.style.backgroundColor = "#424242";
    }
    remark_btn.onmousedown = function(ev) {
        this.style.backgroundColor = "#757575";
    }
    remark_btn.onmouseup = function(ev) {
        this.style.backgroundColor = "#424242";
    }
    remark_btn.onmouseleave = function(ev) {
        this.style.backgroundColor = "#263238";
    }
    remark_btn.onclick = () => {};
    tip_right.append(remark_btn);
    config_box_tip.append(tip_left, tip_right);
    config_box.append(config_box_tip);

    // Input elements events
    input_elements.d_date[1].addEventListener("click", function(ev) {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let now_date = `${year}/${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}`;
        if (this.value !== now_date) {
            this.value = now_date;
        }
    })

    // Following authors
    let d_authors = [];
    if (od_properties.d_authors.length > 0) {
        d_authors = od_properties.d_authors.split(",").map((x, i, arr) => {
            return x.trim();
        }).filter((x, i, arr) => {
            return x.length > 0;
        });
    }

    // Toggle to save inputs
    config_btn.addEventListener("click", (ev) => {
        if (config_box.style.display === "block") {
            let input_values = {
                d_authors: input_elements.d_authors[1].value,
                d_date: input_elements.d_date[1].value,
                d_date_remark: input_elements.d_date_remark[1].value
            };
            for (const [key, value] of Object.entries(input_values)) {
                if (value && value !== od_properties[key]) {
                    od_properties[key] = value;
                    GM_setValue(key, value);
                }
                if (key === "d_authors" && value.length > 0) {
                    d_authors = value.split(",").map((x, i, arr) => {
                        return x.trim();
                    }).filter((x, i, arr) => {
                        return x.length > 0;
                    });
                }
            }
            config_box.style.display = "none";
            if (remark_btn.onclick) {
                remark_btn.click();
            }
        } else {
            config_box.style.display = "block";
        }
    });


    // Functions ==============================================================

    /**
     * Date time from JST to Local.
     * @param {String} original_string Original datetime string in the link.
     */
    function datetime_jst2local(original_string) {
        const [y, m, d, hh, mm, ss] = original_string.split('/');
        const iso_datetime = `${y}-${m}-${d}T${hh}:${mm}:${ss}+09:00`
        const local_date = new Date(iso_datetime);

        const yy = local_date.getFullYear();
        const mm2 = (local_date.getMonth() + 1).toString().padStart(2, '0');
        const dd2 = local_date.getDate().toString().padStart(2, '0');

        return `${yy}/${mm2}/${dd2}`;
    }

    var marked_count = 0;
    /**
     * Generate a function.
     * @param {(_illust_card: HTMLLIElement, _name: String) => HTMLElement|null} _card_selector
     *      The parameter name: 'image', 'title', 'author'
     * @returns A function to mark illust card.
     */
    function mark_illust_by(_card_selector) {
        /**
        * Mark ullust card.
        * @param {HTMLLIElement} _illust_card The card element.
        * @param {HTMLImageElement} _illust_image The image element.
        */
        function mark_illust(_illust_card, _illust_image) {
            let illust_datetime = _illust_image.src.match(/(?<=\/img\/)\d{4}\/\d{2}\/\d{2}\/\d{2}\/\d{2}\/\d{2}/)[0];
            let illust_date = "1970/01/01";
            if (!illust_datetime) {
                console.log("Warn: Illust date detection error happened.");
            } else {
                illust_date = datetime_jst2local(illust_datetime);
            }

            let color_green = "#52be8080";
            let color_grey = "#5d6d7e80";
            let color_blue = "#3498db80";
            let color_yellow = "#f4d03f80";

            let color_select;
            if (illust_date > od_properties.d_date) {
                color_select = color_green;
            } else if (illust_date < od_properties.d_date) {
                color_select = color_grey;
            } else {
                let title_element = _card_selector(_illust_card, 'title');
                let title_text = '';
                if (title_element) {
                    title_text = title_element.innerText;
                }
                // Text that is included in title
                color_select = title_text.includes(od_properties.d_date_remark) ? color_yellow : color_blue;
            }

            let author_element = _card_selector(_illust_card, 'author');
            let author_name = '';
            if (author_element) {
                author_name = author_element.innerText;
            }
            let border_radius = ".6em";
            for (let d_author of d_authors) {
                if (author_name.startsWith(d_author)) {
                    _illust_card.style.backgroundImage = `linear-gradient(to top, ${color_select}, transparent 25%)`;
                    _illust_card.style.borderRadius = border_radius;
                    if (author_element) {
                        let author_banner = author_element.parentElement?.parentElement;
                        if (author_banner) {
                            author_banner.style.backgroundColor = `linear-gradient(to top, ${color_select}, transparent)`;
                            author_banner.style.borderRadius = `0 0 ${border_radius} ${border_radius}`;
                        }
                    }
                    marked_count++;
                }
            }
        }

        /**
        * Mark ullust card.
        * @param {HTMLLIElement} _illust_card The card element.
        */
        function mark_illust_wrap(_illust_card) {
            /** @type {HTMLImageElement} */
            let illust_image = _card_selector(_illust_card, 'image');
            if (illust_image) {
                mark_illust(_illust_card, illust_image);
            } else {
                const illust_observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            let _illust_image = _card_selector(entry.target, 'image');
                            mark_illust(_illust_card, _illust_image);
                            illust_observer.unobserve(entry.target);
                        }
                    })
                });
                illust_observer.observe(_illust_card);
            }
        }

        return mark_illust_wrap;
    }

    var bursting = false;
    var last_ms = 0;
    /**
     * Mark cards.
     * @param {HTMLUListElement} _illust_list The cards element.
     * @param {(_illust_card: HTMLLIElement) => Boolean} _mark_callback The mark function for one card.
     * @param {Number} _cd Cooldown time in ms.
     * @param {Number} _dur Duration time in ms.
     */
    function mark_illusts(_illust_list, _mark_callback, _cd=2000, _dur=1000) {
        let now_ms = Date.now();
        if (!_illust_list || (!bursting && now_ms - last_ms < _cd)) {
            return;
        }

        bursting = true
        if (bursting && now_ms - last_ms >= _dur) {
            bursting = false;
            last_ms = Date.now();
        }

        /** @type {HTMLCollectionOf<HTMLLIElement>} */
        let illust_cards = _illust_list.getElementsByTagName('li');
        console.log('Scanning ' + illust_cards.length + ' illusts.');
        for (let illust_card of illust_cards) {
            _mark_callback(illust_card);
        }
    }

    /**
     * Selector for illust card.
     * @param {HTMLLIElement} _illust_card Illust card.
     * @param {String} _name Target name.
     * @returns {HTMLElement} The element.
     */
    function card_selector_2div(_illust_card, _name) {
        let card_outline = _illust_card.firstElementChild?.firstElementChild;
        let card_bottom = card_outline?.lastElementChild;
        switch (_name) {
            case 'image':
                return card_outline?.firstElementChild?.getElementsByTagName('img').item(0);
            case 'title':
                return card_bottom?.firstElementChild;
            case 'author':
                return card_bottom?.lastElementChild?.lastElementChild?.firstElementChild;

            default:
                return null;
        }
    }

    /**
     * Selector for illust card.
     * @param {HTMLLIElement} _illust_card Illust card.
     * @param {String} _name Target name.
     * @returns {HTMLElement} The element.
     */
    function card_selector_3div(_illust_card, _name) {
        let card_outline = _illust_card.firstElementChild;
        let card_bottom = card_outline?.lastElementChild;
        switch (_name) {
            case 'image':
                return card_outline?.firstElementChild.getElementsByTagName('img').item(0);
            case 'title':
                return card_bottom?.previousElementSibling?.firstElementChild;
            case 'author':
                return card_bottom?.firstElementChild?.lastElementChild;

            default:
                return null;
        }
    }

    var user_viewing_author = document.createElement('div');
    /**
     * Selector for illust card.
     * @param {HTMLLIElement} _illust_card Illust card.
     * @param {String} _name Target name.
     * @returns {HTMLElement} The element.
     */
    function card_selector_user(_illust_card, _name) {
        let card_outline = _illust_card.firstElementChild;
        let card_bottom = card_outline?.lastElementChild;
        switch (_name) {
            case 'image':
                return card_outline?.firstElementChild.getElementsByTagName('img').item(0);
            case 'title':
                return card_bottom?.firstElementChild;
            case 'author':
                return user_viewing_author;

            default:
                return null;
        }
    }

    /**
     * Observer callback for everyday.
     * @param {MutationRecord[]} mutations The mutations.
     */
    function body_mutated(mutations) {
        /** @type {String} */
        let body_type = document.body.getAttribute('data-page-type');
        switch (body_type) {
            case '0':
                console.log("Detected as home page.");
                function body_type_0(_) {
                    if (location.pathname.startsWith('/novel')) {
                        return;
                    }
                    let section1 = document.getElementsByClassName('homeFriendsNewWorks').item(0);
                    if (section1) {
                        let illust_list = section1.getElementsByTagName('ul').item(0);
                        if (illust_list) {
                            mark_illusts(illust_list, mark_illust_by(card_selector_2div, 0))
                        }
                    }
                    let section2 = document.getElementsByClassName('homeRecommendedWorks').item(0);
                    if (section2) {
                        let illust_list = section2.getElementsByTagName('ul').item(0);
                        if (illust_list) {
                            mark_illusts(illust_list, mark_illust_by(card_selector_2div, 0))
                        }
                    }
                }
                remark_btn.onclick = body_type_0;
                body_type_0();
                break;
            case '10':
                console.log("Detected as follows page. ");
                function body_type_10(_) {
                    let works_wrapper = document.getElementsByClassName('worksWrapper').item(0);
                    if (works_wrapper) {
                        let illust_list = works_wrapper.getElementsByClassName('worksUL').item(0);
                        if (illust_list) {
                            mark_illusts(illust_list, mark_illust_by(card_selector_3div));
                        }
                    }
                }
                remark_btn.onclick = body_type_10;
                body_type_10();
                break;
            case '11':
                console.log("Detected as discovery page.");
                function body_type_11(_) {
                    let works_lists = document.getElementsByClassName('worksUL');
                    for (const works_list of works_lists) {
                        mark_illusts(works_list, mark_illust_by(card_selector_3div), 0)
                    }
                }
                remark_btn.onclick = body_type_11;
                body_type_11();
                break;
            case '7':
                console.log("Detected as rank page.");
                remark_btn.onclick = null;
                break;
            case '12':
                console.log("Detected as everyones page.");
                function body_type_12(_) {
                    let section = document.getElementsByTagName('section').item(0);
                    if (section) {
                        let illust_list = section.getElementsByTagName('ul').item(0);
                        if (illust_list) {
                            mark_illusts(illust_list, mark_illust_by(card_selector_3div));
                        }
                    }
                }
                remark_btn.onclick = body_type_12;
                body_type_12();
                break;
            case '1':
                console.log("Detected as contest or detail page.");
                remark_btn.onclick = null;
                break;
            case '21':
                console.log("Detected as request page.");
                function body_type_21(_) {
                    let containers = document.getElementsByClassName('requestContainer');
                    for (const container of containers) {
                        if (container.firstElementChild.children.length < 2) {
                            continue;
                        }
                        let illust_lists = container.getElementsByTagName('ul');
                        if (illust_lists.length > 2) {
                            continue;
                        }
                        let illust_list = illust_lists.length > 1 ? illust_lists.item(1) : illust_lists.item(0);
                        if (illust_list) {
                            if (illust_list.firstElementChild?.tagName !== 'LI') {
                                continue;
                            }
                            mark_illusts(illust_list, mark_illust_by(card_selector_2div), 0);
                        }
                    }
                }
                remark_btn.onclick = body_type_21;
                body_type_21();
                break;
            case '-1':
                console.log("Detected as others page.");
                remark_btn.onclick = null;
                break;

            case '2':
                console.log("Detected as author page");
                user_viewing_author.textContent = document.title.split(' - ').at(0);
                function body_type_2(_) {
                    let user_wrapper = document.getElementsByClassName('userHomeWrapper').item(0);
                    if (user_wrapper && user_wrapper.firstElementChild?.tagName === 'UL') {
                        let illust_list = user_wrapper.firstElementChild;
                        mark_illusts(illust_list, mark_illust_by(card_selector_user));
                    }
                }
                remark_btn.onclick = body_type_2;
                body_type_2();
                break;

            default:
                console.log(`Unknown page type(${body_type}).`);
                remark_btn.onclick = null;
                break;
        }
    }


    const body_observer = new MutationObserver(body_mutated);
    body_observer.observe(document.body, { childList: true, characterData: true, subtree: true });
})();
