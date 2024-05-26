import request from "supertest";
import app from "../app"
import {Book} from "../models/book"

const strBooks = `[
    {
        "id": 1,
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "genre": "Fiction",
        "price": 50
    },
    {
        "id": 2,
        "title": "1984",
        "author": "George Orwell",
        "genre": "Fiction",
        "price": 75
    },
    {
        "id": 3,
        "title": "Entangled Life",
        "author": "Merlin Sheldrake",
        "genre": "Non-Fiction",
        "price": 55
    }
]`;

describe("API tests", () => {

    const originalBooks : Book[] = JSON.parse(strBooks);

    beforeAll(() => console.log('2 - beforeAll'));

    it("tests /api/books", async () => {
        const response = await request(app).get("/api/books");
        expect(response.body).toEqual(originalBooks);
    });

    it("tests /api/books?id=1", async () => {
        const response = await request(app).get("/api/books?id=1");
        const bookExpect: Book = response.body[0];
        expect(bookExpect).toEqual(originalBooks[0]);
    });

    it("tests edit id=3", async () => {
        let bookPut: Book = Object.assign({}, originalBooks[2]);
        bookPut.price = 40;
        const response = await request(app).put("/api/books").send(bookPut);
        expect(response.status).toEqual(200);
    });

    it("tests delete id=3", async () => {
        const response = await request(app).delete("/api/books/3");
        expect(response.status).toEqual(204);
    });

    it("tests post id=3", async () => {
        const response = await request(app).post("/api/books").send(originalBooks[2]);
        expect(response.status).toEqual(201);
    });

    it("tests /api/books", async () => {
        const response = await request(app).get("/api/books");
        expect(response.body).toEqual(originalBooks);
    });

    it("tests discounted fiction price", async() => {
        const response = await request(app).get("/api/books/discounted-price?genre=Fiction&discount=10");
        expect(response.body).toEqual(JSON.parse('{"discount_percentage": 10, "genre": "Fiction", "total_discounted_price": 112.5}'));
    });
});