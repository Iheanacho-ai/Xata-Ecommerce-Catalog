import { NextApiHandler } from "next";
import { xata } from "../../util/xataClient";

const handler = async (req, res) => {
  const { id } = req.body;
  await xata.db.product.delete(id);
  res.end();
};

export default handler;