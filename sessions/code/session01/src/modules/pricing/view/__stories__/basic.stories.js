import component from  'pricing/view';

customElements.define('pricing-view', component.CustomElementConstructor);

export default {
    title: 'Components/Pricing/View'
};

export const Basic = () => `<h1>Basic</h1> 
    Here we document our component for the most common use case
    <pricing-view></pricing-view`;

export const Advance = () => `<h1>Advance</h1> 
    Here we document our component but is the advance use case
    <pricing-view></pricing-view
    `;