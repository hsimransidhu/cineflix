'use strict';
'use strict';

export function getElement(selector, scope = document) {
    return scope.getElementById(selector);
}

export function select(selector, scope = document) {
    return scope.querySelector(selector);
}

export function selectAll(selector, scope = document) {
    return [...scope.querySelectorAll(selector)];
}

export function listen(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

export function create(element) {
    return document.createElement(element);
}

  export * from './utils.js';
