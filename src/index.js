import { createElement } from 'lwc';
import MyPricing from  'pricing/view';

const app = createElement('pricing-view', { is: MyPricing });
// eslint-disable-next-line @lwc/lwc/no-document-query
document.querySelector('#main').appendChild(app);
