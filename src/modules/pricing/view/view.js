import { LightningElement, api , track} from 'lwc';

export default class View extends LightningElement {
    @api name = 'World';
    @api countClicks = 0;
    @track  countLogs = []; 


    handleToogleDates() {
        const items = this.template.querySelectorAll('pricing-item');
        items.forEach( item => {
            item.toogleDate();
        })
    }

    handleToogleInTheParent() {
        console.log('handleToogleInTheParent');
    }


    handleChange(event) {
        console.log('handle Change' );
        this.name = event.target.value;
    }

    handleButton(event) {
        console.log('handle Button' );
        this.countClicks++;        
        this.countLogs.push( { clickNum: this.countClicks , time: new Date() } );
    }

    constructor() {
        super();
        console.log('Constructor' );
    }
    
    connectedCallback() {
        console.log('Connected');
    }
    
    renderedCallback() {
        console.log('Render');
    }
    
    errorCallback(error, stack) {
        console.log('Error' + error);       
    }
    
    disconnectedCallback() {
        console.log('Disconnected');
    }
    
    get reverseName() {
        console.log('Reverse Property with value: ' + this.name ); 
        console.log('Reverse Property with Count Clicks: ' + this.countLogs ); 
        console.log('Reverse Property with Count Clicks: ' + this.countClicks ); 
        return this.name.split("").reverse().join("");
    }    
    
}