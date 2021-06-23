import { WireI18n, i18nStore } from 'utils/wireI18n';
import { useFetch, FetchClient, setFetchClient } from 'utils/fetch';
import { LightningElement, wire, api, track } from 'lwc';

export default class List extends LightningElement {
    labels;
    @wire(WireI18n)
    i18nCallback(i18n) {
        this.labels = i18n;
        console.log(this.labels);
        console.log(this.labels.next);        
    }

    constructor() {
        super();
        const fetchClient = new FetchClient('https://www.googleapis.com');
        setFetchClient(fetchClient);
    }

    currentLanguage = 'en';
    @api get language(){
        return this.currentLanguage;
    }
    set language(value){
        this.currentLanguage = value;
        i18nStore.setLanguage(value);
    }
    
    @track queryParams = { q: 'Harry Potter', startIndex: 0 };
    @track books = [];
    @track error = '';

    @wire(useFetch, {
        url: '/books/v1/volumes',
        queryParams: '$queryParams'
    })
    retrieveBooks( {error, data} ){

        //console.error( '***ERROR***\x1b[31m', error);
        console.log( data);

        if (  data ) {
            data.items.forEach( book => {
                this.books.push( { id: book.id, name: 'This is the book name: ' + book.volumeInfo.title });
            })
        } else {
            this.error = error;
        }

    };

    handlePreviousPage() {
        const params = { ...this.queryParams };
        if ( params.startIndex > 0 ) {
            params.startIndex--;
            this.queryParams = params;
        }
    }

    handleNextPage() {
        const params = { ...this.queryParams };
        params.startIndex++;
        this.queryParams = params;
    }

    handleSearchKeyChange(event) {
        const params = { ...this.queryParams };
        params.startIndex = 0;
        params.q = event.target.value;

        this.queryParams = params;
    }
}
