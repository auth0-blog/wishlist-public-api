import express, { Router } from "express";

import { wishlistDb, collection } from "../data/wishlist.db";
import {
  findAllItems,
  findItemById,
  generateId,
  removeAllItems,
  removeItemById,
  resetItems,
  updateItemById,
} from "./wishlist.service";
import { BaseItem } from "./base-item.interface";

export const wishlistRouter: Router = express.Router();
const wishlistItemsRouter: Router = express.Router();

wishlistRouter.use("/items", wishlistItemsRouter);

// GET /api/wishlist/reset

wishlistRouter.get("/reset", async (request, response) => {
  const items = await resetItems();

  response.status(200).send(items);
});

// GET /api/wishlist/items

wishlistItemsRouter.get("/", async (request, response) => {
  const rows = findAllItems();

  response.status(200).send(rows || []);
});

// GET /api/wishlist/items/:id

wishlistItemsRouter.get("/:id", async (request, response) => {
  const id = request.params.id as string;

  const existingItem = findItemById(id);

  if (existingItem === undefined) {
    response.sendStatus(404);
    return;
  }

  response.json(existingItem);
});

// POST /api/wishlist/items

wishlistItemsRouter.post("/", async (request, response) => {
  console.log(`Add to WishList  ${request.body}`);

  const item = request.body as BaseItem;
  const id = generateId();

  wishlistDb
    .get(collection)
    .push({
      id,
      name: item.name,
      description: item.description,
      url: item.url,
    })
    .write();

  const newItem = wishlistDb.get(collection).find({ id });

  response.status(201).json(newItem);
});

// PUT /api/wishlist/items/:id

wishlistItemsRouter.put("/:id", async (request, response) => {
  const id = request.params.id as string;

  const updatedItemProperties = request.body as BaseItem;

  const existingItem = findItemById(id);

  if (existingItem === undefined) {
    response.sendStatus(404);
    return;
  }

  const updatedItem = updateItemById(id, updatedItemProperties);

  response.status(200).send(updatedItem);
});

// DELETE /api/wishlist/items

wishlistItemsRouter.delete("/", async (request, response) => {
  removeAllItems();

  response.sendStatus(204);
});

// DELETE /api/wishlist/items/:id

wishlistItemsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id as string;

  const existingItem = findItemById(id);

  if (existingItem === undefined) {
    response.sendStatus(404);
    return;
  }

  removeItemById(id);

  response.sendStatus(204);
});
