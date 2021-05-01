import { useFetch, FetchClient, setFetchClient } from 'utils/fetch';
import { LightningElement, wire, track } from 'lwc';

export default class List extends LightningElement {

    constructor() {
        super();
        const fetchClient = new FetchClient('https://www.googleapis.com');
        setFetchClient(fetchClient);        
    }

    @track queryParams = { q: 'Harry Potter', startIndex: 0 }

    @wire(useFetch, {
        url: '/books/v1/volumes',
        queryParams: '$queryParams'
    }) books;

    handlePreviousPage() {
        const params = {... this.queryParams};
        //if ( params.startIndex > 0 ) {
            params.startIndex--;
            this.queryParams = params;
        //}
    }

    handleNextPage() {
        const params = {... this.queryParams};
        params.startIndex++;
        this.queryParams = params;
    }

    handleSearchKeyChange(event) {
        const params = {... this.queryParams};
        params.startIndex = 0;
        params.q = event.target.value;
        
        this.queryParams = params;
    }
}