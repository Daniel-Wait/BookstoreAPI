
import { Book } from '../models/book';
import { DataAccessLayer } from './data_access';

export class BusinessLogicLayer{
    private data_access : DataAccessLayer;

    constructor() {
        this.data_access = new DataAccessLayer();
    }

    // CRUD
    create(book : Book){
       this.data_access.create(book);
    }

    read() : Book[] {
        return this.data_access.read();
    }

    update(book : Book) {
        this.data_access.update(book);
    }

    delete(id : number) {
        this.data_access.delete(id);
    }
}