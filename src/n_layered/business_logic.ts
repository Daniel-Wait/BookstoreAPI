
import { Book } from '../models/book';
import { DataAccessLayer } from './data_access';

export class BusinessLogicLayer{
    private data_access : DataAccessLayer;

    constructor() {
        this.data_access = new DataAccessLayer();
    }

    // CRUD
    create(book : Book){
        const existingBook = this.data_access.read().find(b => b.id === book.id);
        if (existingBook) {
            throw new Error(`Book with ID ${book.id} already exists.`);
        }
        this.data_access.create(book);
    }

    read() : Book[] {
        return this.data_access.read();
    }

    readWithQuery(query: Partial<Book>): Book[] {
        return this.read().filter(book => {
            for (const key in query) {
                if (query[key as keyof Book] !== undefined && book[key as keyof Book] !== query[key as keyof Book]) {
                    return false;
                }
            }
            return true;
        });
    }

    update(book : Book) {
        const existingBook = this.data_access.read().find(b => b.id === book.id);
        if (!existingBook) {
            throw new Error(`Book with ID ${book.id} does not exist.`);
        }
        this.data_access.update(book);
    }

    delete(id : number) {
        const existingBook = this.data_access.read().find(b => b.id === id);
        if (!existingBook) {
            throw new Error(`Book with ID ${id} does not exist.`);
        }
        this.data_access.delete(id);
    }
}