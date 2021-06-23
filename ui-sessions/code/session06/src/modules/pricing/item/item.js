import { LightningElement, api} from 'lwc';

export default class viewItem extends LightningElement {
    @api time = new Date();
    _showDate = true;

    get showDate() {
        return this._showDate;
    }

    @api set showDate( value ) {
        this._showDate = value;
        this.dispatchEvent( new CustomEvent('toogle', ) );
        console.log( 'toogle OLD');
    }

    @api toogleDate() {
        this._showDate = !this._showDate;
        this.dispatchEvent( new CustomEvent('toggle', { detail: { showDate: this._showDate}, composed: true, bubbles: true  }) );
        console.log( 'toogle new ');
    }

    get formatDate( ){
        const months = [ 'Jan', 'Feb','Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return this.time.getDate() + ' ' + months[this.time.getMonth()] + ' of ' + this.time.getFullYear() ;
    }
    get formatTime( ){
        return this.time.getHours() + ':' +  this.time.getMinutes() + ':' +  this.time.getSeconds();
    }
}