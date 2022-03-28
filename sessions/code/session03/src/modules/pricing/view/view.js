import { LightningElement, api } from 'lwc';

export default class View extends LightningElement {
    @api name = 'World';

    handleChange(event) {
        this.name = event.target.value;
    }
}