// Generated by Xata Codegen 0.18.0. Please do not edit.
import { buildClient } from "@xata.io/client";
/** @typedef { import('./types').SchemaTables } SchemaTables */
/** @type { SchemaTables } */
const tables = [
  {
    name: "product",
    columns: [
      { name: "productName", type: "string" },
      { name: "productPrice", type: "string" },
      { name: "productURL", type: "string" },
    ],
  },
];
/** @type { import('@xata.io/client').ClientConstructor<{}> } */
const DatabaseClient = buildClient();
const defaultOptions = {
  databaseURL:
    "https://Amarachi-Iheanacho-s-workspace-u3bis1.us-east-1.xata.sh/db/product-catalog",
};
/** @typedef { import('./types').DatabaseSchema } DatabaseSchema */
/** @extends DatabaseClient<DatabaseSchema> */
export class XataClient extends DatabaseClient {
  constructor(options) {
    super({ ...defaultOptions, ...options }, tables);
  }
}
let instance = undefined;
/** @type { () => XataClient } */
export const getXataClient = () => {
  if (instance) return instance;
  instance = new XataClient();
  return instance;
};
