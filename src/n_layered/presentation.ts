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
        const query : Partial<Book> = {};
        if (req.query.id) query.id = parseInt(req.query.id as string);
        if (req.query.title) query.title = req.query.title as string;
        if (req.query.author) query.author = req.query.author as string;
        if (req.query.genre) query.genre = req.query.genre as string;
        if (req.query.price) query.price = parseFloat(req.query.price as string);

        const library = this.business_logic.readWithQuery(query);
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

    // Discount
    getDiscountedPrice(req: Request, res: Response): void {
        const genre = req.query.genre as string;
        const discount = parseFloat(req.query.discount as string);
    
        if (!genre || isNaN(discount)) {
          res.status(400).send('Invalid genre or discount percentage');
          return;
        }
    
        const totalDiscountedPrice = this.business_logic.calculateDiscountedPrice(genre, discount);
        res.json({ genre, discount_percentage: discount, total_discounted_price: totalDiscountedPrice });
      }
}