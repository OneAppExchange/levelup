import '@lwc/synthetic-shadow';
import { createElement } from 'lwc';
import MyPricing from  'pricing/view';
import MyBookList from  'books/list';

customElements.define('books-list', MyBookList.CustomElementConstructor);
customElements.define('pricing-view', MyPricing.CustomElementConstructor);


const destroy = () => {
    let element = document.getElementsByTagName("pricing-view")[0];
    element.parentElement.removeChild(element);
};
const change = () => {
    let element = document.getElementsByTagName("pricing-view")[0];
    element.name = (new Date()).toString();
};

document.getElementById('destroy').addEventListener( "click", destroy);
document.getElementById('change').addEventListener( "click", change);

export { createElement, MyPricing };
