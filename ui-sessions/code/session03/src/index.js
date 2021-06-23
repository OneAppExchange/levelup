import '@lwc/synthetic-shadow';
import { createElement } from 'lwc';
import MyPricing from  'pricing/view';

customElements.define('pricing-view', MyPricing.CustomElementConstructor);

export { createElement, MyPricing };
