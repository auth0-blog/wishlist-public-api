import low, { LowdbSync } from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

import { WishList } from "../wishlist/wishlist.interface";

const adapter = new FileSync<WishList>("./src/data/wishlist.data.json", {
  defaultValue: { items: [] },
});

export let wishlistDb: LowdbSync<WishList> = low(adapter);
export const collection = "items";
