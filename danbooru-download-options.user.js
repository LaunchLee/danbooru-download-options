// ==UserScript==
// @name         Danbooru Download Options
// @namespace    https://github.com/LaunchLee/danbooru-download-options/
// @updateURL    https://raw.githubusercontent.com/LaunchLee/danbooru-download-options/refs/heads/main/danbooru-download-options.user.js
// @downloadURL  https://raw.githubusercontent.com/LaunchLee/danbooru-download-options/refs/heads/main/danbooru-download-options.user.js
// @version      2024.12.11.9
// @description  Download images with my name patterns.
// @author       Launch Lee
// @match        https://danbooru.donmai.us/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAJUExURQMCA7CNaaWBYRsvcHUAAAAHdElNRQfqAQwOIQiEZ7SXAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDI2LTAxLTEyVDE0OjI3OjQ1KzAwOjAwmP1aDwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyNi0wMS0xMlQxNDoyNzo0NSswMDowMOmg4rMAAAAodEVYdGRhdGU6dGltZXN0YW1wADIwMjYtMDEtMTJUMTQ6MzM6MDgrMDA6MDCTTdPsAAAANUlEQVQY02NgIAowwgAGnxFDJboCUgWYGIAIBJgYmSCAgQkqwAQVQhJgwiLACBJgQFNBHAAATSkAqR1RSgkAAAAASUVORK5CYII=
// @grant        GM_download
// ==/UserScript==

(function() {
    'use strict';

    /**
     * Change the border of the post.
     * @param {HTMLDivElement} _post_div The post element, whose tag is div.
     * @param {String} _border_width The border width.
     * @param {String} _border_style The border style.
     * @param {String} _border_color The border color.
     */
    function borders_on_post(_post_div, _border_width, _border_style, _border_color) {
        _post_div.style.borderLeft = `${_border_width} ${_border_style} ${_border_color}`;
        _post_div.style.borderRight = `${_border_width} ${_border_style} ${_border_color}`;
        _post_div.style.borderBottom = `${_border_width} ${_border_style} ${_border_color}`;
        _post_div.style.borderRadius = `${_border_width}`;
    }

    /**
     * Browsing a post.
     * @param {Document} _document The document.
     * @param {HTMLDivElement} _post_div The post div element in posts page.
     * @param {Boolean} _modify True when browsing a post.
     */
    function download_in_post(_document, _post_div=null) {
        let post_date = _document.getElementById('post-info-date').getElementsByTagName('time')[0].getAttribute('title');
        let date_time = post_date.split(' ');
        let basename = date_time[0] + '_' + date_time[1].replaceAll(':', '');

        let option_download = _document.getElementById('post-option-download');
        let download_href = option_download.getElementsByTagName('a')[0].getAttribute('href');
        let extension = download_href.substring(
            download_href.lastIndexOf('.'),
            download_href.lastIndexOf('?')
        );

        let filename = basename + extension;

        let req_header = {
            'referer': 'https://danbooru.donmai.us/'
        };
        let req_detail = {
            url: download_href,
            name: filename,
            header: req_header
        };
        if (_post_div === null) {
            let new_option_download_li = _document.createElement('li');
            let new_option_download_a = _document.createElement('a');
            new_option_download_a.textContent = 'Download (date)';
            new_option_download_a.download = filename;
            new_option_download_a.href = download_href;
            new_option_download_li.appendChild(new_option_download_a);
            new_option_download_a.onclick = function(event) {
                event.preventDefault();
                GM_download(req_detail);
            };
            option_download.after(new_option_download_li);
        } else {
            GM_download(req_detail);
            let border_color = '#27ae60'; // Green
            borders_on_post(_post_div, '.1em', 'solid', border_color);
        }
    }

    /**
     * Browsing posts.
     * @param {HTMLElement} _post The post element, whose tag is article.
     * @param {String|String[]} _domain The site domain.
     */
    function download_in_posts(_post, _domain="") {
        let post_div = _post.getElementsByTagName('div')[0];
        borders_on_post(post_div, '.1em', 'dotted', 'LightGray');
        fetch(
            _post.getElementsByTagName('a')[0].href
        ).then(response => {
            let post_div = _post.getElementsByTagName('div')[0];
            if (response.ok) {
                response.text().then((response_text) => {
                    let post_dom = new DOMParser().parseFromString(response_text, "text/html");
                    let post_source = post_dom.getElementById('post-info-source').getElementsByTagName('a');
                    let border_color;
                    let post_valid;
                    if (_domain.length > 0) {
                        if (post_source.length > 0) {
                            if (_domain instanceof Array) {
                                post_valid = true;
                                for (let _exclude of _domain) {
                                    if (post_source[0].getAttribute('href').includes(_exclude)) {
                                        post_valid = false;
                                        break;
                                    }
                                }
                            } else if (post_source[0].getAttribute('href').includes(_domain)) {
                                post_valid = true;
                            } else {
                                post_valid = false;
                            }
                        } else if (_domain === '?') {
                            post_valid = true;
                        } else {
                            post_valid = false;
                        }
                    } else {
                        post_valid = true;
                    }
                    if (post_valid) {
                        download_in_post(post_dom, post_div);
                    } else {
                        border_color = '#f1c40f'; // Yellow
                        borders_on_post(post_div, '.1em', 'solid', border_color);
                    }
                }).catch(error => {
                    console.error(`Error: ${error}`);
                    let post_div = _post.getElementsByTagName('div')[0];
                    let border_color = '#f1c40f'; // Yellow
                    borders_on_post(post_div, '.2em', 'dotted', border_color);
                });
            } else {
                let border_color = '#e74c3c'; // Red
                borders_on_post(post_div, '.1em', 'solid', border_color);
            }
        }).catch(error => {
            console.error(`Error: ${error}`);
            let post_div = _post.getElementsByTagName('div')[0];
            let border_color = '#e74c3c'; // Red
            borders_on_post(post_div, '.2em', 'dotted', border_color);
        })
    }

    /**
     * Generate an option of the download.
     * @param {HTMLCollectionOf<HTMLElement>} _posts The posts collection.
     * @param {String} _site The site name. It is considered as to download all if it is empty.
     * @param {String} _domain The site domain. Also so does this.
     * @returns {HTMLLIElement} The download option.
     */
    function download_li_posts(_posts, _site="", _domain="") {
        let new_option_download_li = document.createElement('li');
        let new_option_download_a = document.createElement('a');
        let specialized_as = _site.length > 0 ? _site : _posts.length;
        new_option_download_a.textContent = `Download (${specialized_as})`;
        new_option_download_a.href = 'javascript:void(0);';
        new_option_download_a.onclick = function(event) {
            event.preventDefault();
            for(let i = 0; i < _posts.length; i++) {
                let post = _posts[i];
                setTimeout(download_in_posts, 250 * (i + 1), post, _domain);
            }
        };
        new_option_download_li.appendChild(new_option_download_a);
        return new_option_download_li;
    }

    /* ************************ Main ************************ */
    let post_options = document.getElementById('post-options');
    let options_box = document.getElementById('options-box');

    if (post_options) {
        // Browsing a post
        console.log("INFO: You are browsing a post.");
        download_in_post(document);
    } else if (options_box) {
        // Browsing posts
        console.log("INFO: You are browsing posts.");

        let posts = document.getElementById('posts').getElementsByTagName('article');
        let options_ul = options_box.getElementsByTagName('ul')[0];

        // Download button for each post
        for (let post of posts) {
            let post_div = post.getElementsByTagName('div')[0];
            post_div.style.position = 'relative';
            let btn_div = document.createElement('div');
            btn_div.style.position = 'absolute';
            btn_div.style.right = '.3em';
            btn_div.style.bottom = '.3em';
            btn_div.style.opacity = '.7';
            let btn_download = document.createElement('button');
            btn_download.type = 'button';
            btn_download.innerHTML = `
                <svg width="12" height="12" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg">
                    <path fill="DarkGray" d="m3 0v3h-2l3 3 3-3h-2v-3zm-3 7v1h8v-1z" />
                </svg>
            `;
            btn_download.onclick = function(event) {
                event.preventDefault();
                download_in_posts(post, false);
            }
            btn_div.style.textAlign = 'center';
            btn_div.appendChild(btn_download);
            post_div.appendChild(btn_div);
        }

        // Download options in options
        let sources_sites = ['Twitter', 'Pixiv', 'Yande', 'DLsite']
        let sources_domains = ['twitter.com', 'pixiv.net', 'yande.re', 'dlsite.com']
        options_ul.appendChild(download_li_posts(posts));
        for (let i = 0; i < sources_domains.length; i++) {
            options_ul.appendChild(download_li_posts(posts, sources_sites[i], sources_domains[i]));
        }
        options_ul.appendChild(download_li_posts(posts, 'Other', sources_domains));
        options_ul.appendChild(download_li_posts(posts, 'Unknown', '?'));
    } else {
        // Browsing
        console.log("INFO: Downloader has nothing to do.");
    }
})();
