import { LightningElement, api , track} from 'lwc';

export default class List extends LightningElement {

    handleSlotChange( event ) {
        console.log(event)
    }
}
