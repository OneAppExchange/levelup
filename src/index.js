import { createElement } from 'lwc';
import MyPricing from  'pricing/view';

customElements.define('pricing-view', MyPricing.CustomElementConstructor);

//const app = createElement('pricing-view', { is: MyPricing });
// eslint-disable-next-line @lwc/lwc/no-document-query
//app.setAttribute("name", "my friends");
//document.querySelector('#main').appendChild(app);



export { createElement, MyPricing };
