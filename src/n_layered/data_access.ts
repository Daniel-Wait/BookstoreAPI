import fs from 'fs';
import { Book } from '../models/book';
import { DataBaseJson } from './data_base_json';

export class DataAccessLayer{
    private library : Book[];
    private database : DataBaseJson;

    constructor() {
        this.database = new DataBaseJson();
        this.library = this.database.readFile();
    }

    private findBookIdx(id : number){
        let idx : number = this.library.findIndex(
            cb => (cb.id == id)
        );
        return idx
    }

    // CRUD
    create(book : Book){
        this.library.push(book);
        this.database.writeFile(this.library);
    }

    read() : Book[] {
        return this.library;
    }

    update(book : Book){
        let idx = this.findBookIdx(book.id);
        this.library[idx] = book;
        this.database.writeFile(this.library);
    }

    delete(id : number){
        let idx = this.findBookIdx(id);
        this.library.splice(idx ,1);
        this.database.writeFile(this.library);
    }
}
