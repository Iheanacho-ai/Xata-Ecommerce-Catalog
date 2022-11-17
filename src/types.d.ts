import {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";
declare const tables: readonly [
  {
    readonly name: "product";
    readonly columns: readonly [
      {
        readonly name: "productName";
        readonly type: "string";
      },
      {
        readonly name: "productPrice";
        readonly type: "string";
      },
      {
        readonly name: "productURL";
        readonly type: "string";
      }
    ];
  }
];
export declare type SchemaTables = typeof tables;
export declare type InferredTypes = SchemaInference<SchemaTables>;
export declare type Product = InferredTypes["product"];
export declare type ProductRecord = Product & XataRecord;
export declare type DatabaseSchema = {
  product: ProductRecord;
};
declare const DatabaseClient: any;
export declare class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions);
}
export declare const getXataClient: () => XataClient;
export {};
