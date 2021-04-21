# Session 3
The goal of this lesson will be to add some "color" and start using the lightning-base-components. 

We can create our components or we can use external libraries. The lwc provides a mechanism to resolve and we will see this configuring the lwc.config.js


## Installing & Configuring
Before coding we will need to install the ligthning base components

````
yarn add -D lightning-base-components
````

After that we need to tell lwc that we are using a library, so module resolution can go there. For more information of module resolution visit [lwc site](https://lwc.dev/guide/es_modules#module-resolution) and more technicall in the [RFC](https://rfcs.lwc.dev/rfcs/lwc/0020-module-resolution)

So, let go and edit the lwc.config.js and add the npm resolution for lightning-base-components

````
{
    "modules": [
        {
            "dir": "src/modules"
        },
        {
            "npm": "lightning-base-components"
        }       
    ],
    "expose": [
        "pricing/view"
    ]
}
````

## Coding

Now lets simple add a ligthning-input to our component

````
    <lightning-input label="Name" value={name} onchange={handleChange}></lightning-input>
````

Notice that we bind the value to the Javascript property, and also we bind the onchange event to a method. So let's create that method

````
    handleChange(event) {
        this.name = event.target.value;
    }
````

## Testing

Before adding the test case we need to add Stubs of ligthning, otherwise will show an error when reading lightning-input. 

I found this a simple way to do that. We can install @salesforce/sfdx-lwc-jest and copy the stubs into a jest-mocks folder (I've tried linking to node_modules folder or create symbolic link but none of those work!).  After that we can configure Jest to find the ligthing stubs

````
yarn add -D @salesforce/sfdx-lwc-jest
mkdir jest-mocks
cp -R node_modules/@salesforce/sfdx-lwc-jest/src/lightning-stubs jest-mocks/lightning
````

After that we can add the following moduleNameMapper to the jest.config.js file

````
const { jestConfig } = require('lwc-services/lib/config/jestConfig');

const setupFilesAfterEnv = jestConfig.setupFilesAfterEnv || [];
setupFilesAfterEnv.push('<rootDir>/jest-sa11y-setup.js');

module.exports = {
    ...jestConfig,
    // Stubs for 3rd party components
    moduleNameMapper: {
        '^lightning/(.+)$': '<rootDir>/jest-mocks/lightning/$1/$1'
    },
    setupFilesAfterEnv
};

````



Now let's add this test case 

````
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
````

