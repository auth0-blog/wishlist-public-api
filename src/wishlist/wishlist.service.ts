import shortid from "shortid";
import { wishlistDb, collection } from "../data/wishlist.db";
import { WishlistItem } from "./wishlist-item.interface";
import { BaseItem } from "./base-item.interface";

shortid.characters(
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@"
);

export const generateId = (): string => shortid.generate();

export const findAllItems = (): WishlistItem[] =>
  wishlistDb.get(collection).value();

export const findItemById = (id: string): WishlistItem | undefined =>
  wishlistDb.get(collection).find({ id }).value();

export const updateItemById = (
  id: string,
  payload: BaseItem
): WishlistItem | undefined =>
  wishlistDb.get(collection).find({ id }).assign(payload).write();

export const removeAllItems = (): ArrayLike<WishlistItem> =>
  wishlistDb.get(collection).remove().write();

export const removeItemById = (id: string): ArrayLike<WishlistItem> =>
  wishlistDb.get(collection).remove({ id }).write();

export const resetItems = (): ArrayLike<WishlistItem> => {
  removeAllItems();

  return wishlistDb
    .get(collection)
    .push(
      {
        id: generateId(),
        name: "Apple iPhone 12",
        description: "128GB, White",
        url: "https://www.amazon.com/dp/B08L5Q1L2Q/",
      },
      {
        id: generateId(),
        name: "PlayStation 5 Console",
        description: "Ultra-high speed SSD and 3D Audio",
        url: "https://www.amazon.com/PlayStation-5-Console/dp/B08FC5L3RG",
      },
      {
        id: generateId(),
        name: "Xbox Series S Console",
        description: "Smallest, sleekest Xbox console ever",
        url: "https://www.amazon.com/Xbox-S/dp/B08G9J44ZN",
      }
    )
    .write();
};
