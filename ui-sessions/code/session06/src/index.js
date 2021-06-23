import '@lwc/synthetic-shadow';
import { createElement } from 'lwc';
import MyPricing from  'pricing/view';

customElements.define('pricing-view', MyPricing.CustomElementConstructor);


const destroy = () => {
    let element = document.getElementsByTagName("pricing-view")[0];
    element.parentElement.removeChild(element);
};
const change = () => {
    let element = document.getElementsByTagName("pricing-view")[0];
    element.name = (new Date()).toString();
};

let container = document.getElementById("pricing-container");


//container.addEventListener( "toggle", (e) => console.log(e) );



document.getElementById('destroy').addEventListener( "click", destroy);
document.getElementById('change').addEventListener( "click", change);

export { createElement, MyPricing };
