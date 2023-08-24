import { type SchemaTypeDefinition } from "sanity";

import blockContent from "./schemas/blockContent";
import category from "./schemas/category";
import post from "./schemas/post";
import author from "./schemas/author";
import city from "./schemas/city";
import propertyaccessibility from "./schemas/propertyaccessibility";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, city, propertyaccessibility, author, category, blockContent],
};
