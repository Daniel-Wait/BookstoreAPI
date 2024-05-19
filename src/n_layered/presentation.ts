import { Request, Response } from 'express';
import { Book } from "../models/book"
import { BusinessLogicLayer } from "./business_logic";

export class Presentation {
    private business_logic : BusinessLogicLayer;

    constructor() {
        this.business_logic = new BusinessLogicLayer();    
    }

    // CRUD
    create(req: Request, res: Response): void{
        const book: Book = req.body;
        this.business_logic.create(book);
        res.status(201).send('Book created successfully');
    }

    read(req: Request, res: Response): void{
        const library = this.business_logic.read();
        res.json(library);
    }

    update(req: Request, res: Response): void{
        const book: Book = req.body;
        this.business_logic.update(book);
        res.status(200).send('Book updated successfully');
    }

    delete(req: Request, res: Response): void{
        const id = parseInt(req.params.id);
        this.business_logic.delete(id);
        res.status(204).send('Book deleted successfully');
    }
}