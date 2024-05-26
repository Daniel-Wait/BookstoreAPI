// src\n_layered\data_base_json.ts

import fs from 'fs';
import { Book } from '../models/book';


export class DataBaseJson{
    private readonly DB_FILE_PATH : string;

    constructor(){
        this.DB_FILE_PATH  = './src/data/books.json'; // never change this
    }

    readFile() : Book[] {
        return JSON.parse(
            fs.readFileSync(this.DB_FILE_PATH, 'utf-8')
        );
    }

    writeFile(library : Book[]) : void {
        fs.writeFileSync(this.DB_FILE_PATH, JSON.stringify(library, null, 2));
    }
}
