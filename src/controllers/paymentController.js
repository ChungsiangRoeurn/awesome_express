import { prisma } from "../config/db.js";
import { v4 as uuid } from "uuid";

export const createTopUp = async (req, res) => {
  const { amount } = req.body;

  const tx = await prisma.transaction.create({
    data: {
      userId: req.user.id,
      amount,
      status: "PENDING",
      type: "TOPUP",
      reference: uuid(),
    },
  });

  // Fake QR string
  const fakeQR = `bakong://pay?ref=${tx.reference}&amount=${amount}`;

  res.json({ transaction: tx, qr: fakeQR });
};

export const mockBakongWebhook = async (req, res) => {
  const { reference } = req.body;

  const tx = await prisma.transaction.findFirst({
    where: { reference },
  });

  if (!tx || tx.status === "SUCCESS") {
    return res.json({ message: "Already processed!" });
  }

  // Atomic update
  await prisma.$transaction([
    prisma.transaction.update({
      where: { id: tx.id },
      data: { status: "SUCCESS" },
    }),

    prisma.wallet.update({
      where: { userId: tx.userId },
      data: { balance: { increment: tx.amount } },
    }),
  ]);

  res.json({ message: "Payment confirmed!" });
};
