import { LightningElement, api} from 'lwc';

export default class viewItem extends LightningElement {
    @api time = new Date();
    showDate = true;

    @api toogleDate() {
        this.showDate = !this.showDate;
        this.dispatchEvent( new CustomEvent('toogle') );
    }

    get formatDate( ){
        const months = [ 'Jan', 'Feb','Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return this.time.getDate() + ' ' + months[this.time.getMonth()] + ' of ' + this.time.getFullYear() ;
    }
    get formatTime( ){
        return this.time.getHours() + ':' +  this.time.getMinutes() + ':' +  this.time.getSeconds();
    }
}