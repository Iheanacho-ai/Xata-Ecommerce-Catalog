//pages/api/add-product.js

import { getXataClient } from '../../src/xata';


const xata = getXataClient();

const handler = async (req, res) => {
  const {productName, productPrice, productURL} = req.body;
  const result = await xata.db.product.create({productName, productPrice, productURL});
  res.send({result});
};

export default handler;