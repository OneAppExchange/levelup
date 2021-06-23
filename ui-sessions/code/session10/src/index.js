import '@lwc/synthetic-shadow';
import { createElement } from 'lwc';
import MyPricing from 'pricing/view';
import MyBookList from 'books/list';

customElements.define('books-list', MyBookList.CustomElementConstructor);

const destroy = () => {
    let element = document.getElementsByTagName('books-list')[0];
    element.parentElement.removeChild(element);
};
const change = () => {
    let element = document.getElementsByTagName('books-list')[0];
    element.name = new Date().toString();
};

const lang = () => {
    let element = document.getElementsByTagName('books-list')[0];
    element.language = element.language =='en' ? 'es' :'en';
};

document.getElementById('lang').addEventListener('click', lang);
document.getElementById('destroy').addEventListener('click', destroy);
document.getElementById('change').addEventListener('click', change);

export { createElement, MyPricing };
