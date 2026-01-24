import { prisma } from "../config/db.js";

export const getWallet = async (req, res) => {
  const wallet = prisma.wallet.findUnique({
    where: { id: req.user.id },
  });

  res.json(wallet);
};
