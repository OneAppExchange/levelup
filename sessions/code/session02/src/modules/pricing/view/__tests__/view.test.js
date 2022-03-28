import { createElement } from 'lwc';
import View from 'pricing/view';

describe('pricing-view', () => {
    it('displays hello', () => {
        // Create element
        const element = createElement('pricing-view', {
            is: View
        });
        document.body.appendChild(element);

        // Verify displayed greeting
        const div = element.shadowRoot.querySelector('div');
        expect(div.textContent).toBe('Hello World !');
    });    
    
    it('displays hello my friends', () => {
        // Create element
        const element = createElement('pricing-view', {
            is: View
        });
        element.name = "my friends";

        document.body.appendChild(element);

        // Verify displayed greeting
        const div = element.shadowRoot.querySelector('div');
        expect(div.textContent).toBe('Hello my friends !');
    });

    it('is accessible', () => {
        const element = createElement('pricing-view', {
            is: View
        });

        document.body.appendChild(element);

        return Promise.resolve().then(() => expect(element).toBeAccessible());
    });


});