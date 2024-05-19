import fs from 'fs';
import { Book } from '../models/book';

const DB_FILE_PATH = './src/data/books.json';

export class DataAccessLayer{
    private library : Book[];

    constructor() {
        this.library = JSON.parse(
            fs.readFileSync(DB_FILE_PATH, 'utf-8')
        );
    }

    private writeFile() {
        fs.writeFileSync(DB_FILE_PATH, JSON.stringify(this.library, null, 4));
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
        this.writeFile()
    }

    read() : Book[] {
        return this.library;
    }

    update(book : Book){
        let idx = this.findBookIdx(book.id);
        this.library[idx] = book;
        this.writeFile();
    }

    delete(id : number){
        let idx = this.findBookIdx(id);
        this.library.splice(idx ,1);
    }
}
