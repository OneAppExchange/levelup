import { useFetch, FetchClient, setFetchClient } from 'utils/fetch';
import { LightningElement, wire, track } from 'lwc';

export default class List extends LightningElement {

    constructor() {
        super();
        const fetchClient = new FetchClient('https://www.googleapis.com');
        setFetchClient(fetchClient);        
    }
    @track variables = {
        apiVersion: 'v1'
    }

    @track queryParams = {
        q: 'Harry Potter',
//        orderBy: '',
        startIndex: 2       
    }

    @wire(useFetch, {
        url: '/books/{apiVersion}/volumes',
        variables: '$variables',
        queryParams: '$queryParams'
    }) books;


    handleSearchKeyChange(event) {
        this.queryParams.q = event.target.value;
    }
}