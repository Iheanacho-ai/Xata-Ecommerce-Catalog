import { xata} from "../index"

const handler = async (req, res) => {
  const { productName, productPrice, productURL} = req.body;
  await xata.db.product.create({ productName, productPrice, productURL});
  res.end();
};

export default handler;