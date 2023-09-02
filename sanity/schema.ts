import { type SchemaTypeDefinition } from "sanity";

import blockContent from "./schemas/blockContent";
import category from "./schemas/category";
import post from "./schemas/post";
import author from "./schemas/author";
import city from "./schemas/city";
import propertyaccessibility from "./schemas/propertyaccessibility";
import state from "./schemas/state";
import LogoChange from "./schemas/LogoChange";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    LogoChange,
    post,
    city,
    state,
    propertyaccessibility,
    author,
    category,
    blockContent,
  ],
};
