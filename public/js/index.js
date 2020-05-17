if (!String.prototype.includes) {
    String.prototype.includes = function(search, start) {
        'use strict';
        if (typeof start !== 'number') {
            start = 0;
        }

        if (start + search.length > this.length) {
            return false;
        } else {
            return this.indexOf(search, start) !== -1;
        }
    };
}

function hasClass(el, className) {
    return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
}

function addClass(el, className) {
    if (el.classList) el.classList.add(className);
    else if (!hasClass(el, className)) el.className += ' ' + className;
}

function removeClass(el, className) {
    if (el.classList) el.classList.remove(className);
    else el.className = el.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
}

let movingCount = 0;

function pageForwards() {
    // let pages = document.getElementsByClassName("page");
    // let marker = false;
    // for (page of pages) {
    //     if (marker) {

    //         marker = false;
    //     } else if (hasClass(page, "active")) {
    //         marker = true;
    //     }
    // }
    movingCount++;
    addClass(document.getElementById("pagesWrapper"), "moving");
    setTimeout(() => {
        let pages = document.getElementsByClassName("page");
        for (let i = 0; i < pages.length; i++) {
            if (hasClass(pages[i], "active")) {
                removeClass(pages[i], "active");
                if (i + 1 < pages.length) {
                    addClass(pages[i + 1], "active");
                    document.getElementById("pagesWrapper").scrollLeft = (window.innerWidth || document.documentElement.clientWidth || 0) * (i + 1);
                } else {
                    addClass(pages[0], "active");
                    document.getElementById("pagesWrapper").scrollLeft = 0;
                }
                break;
            }
        }
        setTimeout(() => {
            movingCount--;
            if (movingCount === 0) {
                removeClass(document.getElementById("pagesWrapper"), "moving");
            }
        }, 1000);
    }, movingCount === 1 ? 1000 : 0);
}

function pageBackwards() {
    movingCount++;
    addClass(document.getElementById("pagesWrapper"), "moving");
    setTimeout(() => {
        let pages = document.getElementsByClassName("page");
        for (let i = 0; i < pages.length; i++) {
            if (hasClass(pages[i], "active")) {
                removeClass(pages[i], "active");
                if (i === 0) {
                    addClass(pages[pages.length - 1], "active");
                    document.getElementById("pagesWrapper").scrollLeft = (window.innerWidth || document.documentElement.clientWidth || 0) * (pages.length - 1);
                } else {
                    addClass(pages[i - 1], "active");
                    document.getElementById("pagesWrapper").scrollLeft = (window.innerWidth || document.documentElement.clientWidth || 0) * (i - 1);
                }
                break;
            }
        }
        setTimeout(() => {
            movingCount--;
            if (movingCount === 0) {
                removeClass(document.getElementById("pagesWrapper"), "moving");
            }
        }, 1000);
    }, movingCount === 1 ? 1000 : 0);
}

function showContents() {
    searchContents("");
    addClass(document.getElementById("contentsPage"), "show");
    if (hasClass(document.getElementById("userPage"), "show")) {
        closeUser();
    }
}

function closeContents() {
    removeClass(document.getElementById("contentsPage"), "show");
}

function searchContents(search) {
    search = search.toLowerCase().trim();
    let pages = document.getElementsByClassName("page");
    let wrapper = document.getElementById("contentsWrapper");
    let html = "";
    for (let i = 0; i < pages.length; i++) {
        let page = pages[i];
        if (page.getAttribute("data-title").toLowerCase().includes(search) || page.innerText.toLowerCase().includes(search)) {
            html += "<span class='contentsItem' onclick='contentsItemClick(this)'><span class='contentsMarker'>" + (i + 1) + ". </span><span class='contentsTitle'>" + page.getAttribute("data-title") + "</span></span>";
        }
    }
    wrapper.innerHTML = html;
}

function contentsItemClick(item) {
    closeContents();
    movingCount++;
    addClass(document.getElementById("pagesWrapper"), "moving");
    setTimeout(() => {
        let i = parseInt(item.getElementsByClassName("contentsMarker")[0].innerText) - 1;
        removeClass(document.querySelector(".page.active"), "active");
        addClass(document.getElementsByClassName("page")[i], "active");
        document.getElementById("pagesWrapper").scrollLeft = (window.innerWidth || document.documentElement.clientWidth || 0) * i;
        setTimeout(() => {
            movingCount--;
            if (movingCount === 0) {
                removeClass(document.getElementById("pagesWrapper"), "moving");
            }
        }, 1000);
    }, movingCount === 1 ? 1000 : 0);
}

function showUser() {
    addClass(document.getElementById("userPage"), "show");
    if (hasClass(document.getElementById("contentsPage"), "show")) {
        closeContents();
    }
}

function closeUser() {
    removeClass(document.getElementById("userPage"), "show");
}