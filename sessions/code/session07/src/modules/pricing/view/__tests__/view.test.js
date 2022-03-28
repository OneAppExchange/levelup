import { createElement } from 'lwc';
import View from 'pricing/view';

describe('pricing-view', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('displays hello world by default', () => {
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
        element.name = 'my friends';

        document.body.appendChild(element);

        // Verify displayed greeting
        const div = element.shadowRoot.querySelector('div');
        expect(div.textContent).toBe('Hello my friends !');
    });

    it('displays Name by change event target', () => {
        const EXPECTED = 'New Name';

        // Create element
        const element = createElement('pricing-view', {
            is: View
        });
        document.body.appendChild(element);

        // Verify default name is different to New Name
        let div = element.shadowRoot.querySelector('div');
        expect(div.textContent).not.toBe(`Hello ${EXPECTED}!`);

        // Trigger new Name
        const inputEl = element.shadowRoot.querySelector('lightning-input');
        inputEl.value = EXPECTED;
        inputEl.dispatchEvent(new CustomEvent('change'));

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise rejects.
        return Promise.resolve().then(() => {
            // Verify displayed New Name
            expect(div.textContent).toBe(`Hello ${EXPECTED} !`);
        });
    });

    it('is accessible', () => {
        const element = createElement('pricing-view', {
            is: View
        });

        document.body.appendChild(element);
        return Promise.resolve().then(() => expect(element).toBeAccessible());
    });
});
