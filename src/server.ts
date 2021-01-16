import * as dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";

import { wishlistRouter } from "./wishlist/wishlist.router";

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
const apiRouter = express.Router();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);
apiRouter.use("/wishlist", wishlistRouter);

app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);
  res.status(500).send(err.message);
});

app.listen(PORT, () => {
  console.log(`Wishlist API serving resources on PORT:${PORT}`);
});
