import router from './routes';

import express from 'express';
import { Request, Response, Application } from 'express';

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use('/api', router);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
