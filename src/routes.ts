// src/routes/bookRoutes.ts
import express, { Router } from 'express';
import { Presentation } from './n_layered/presentation';

const router: Router = express.Router();
const ui = new Presentation();

router.get('/books', ui.read.bind(ui));
router.post('/books', ui.create.bind(ui));
router.put('/books', ui.update.bind(ui));
router.delete('/books/:id', ui.delete.bind(ui));

export default router;
