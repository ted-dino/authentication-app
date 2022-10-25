import { User } from "@prisma/client";
import * as argon2 from "argon2";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prismadb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { bio, name, phone, email, password } = req.body;
  const newPhone = Number(phone);

  let hashedPassword = "";
  if (password) {
    const encryptedPassword = await argon2.hash(password);
    hashedPassword = encryptedPassword;
  }

  try {
    const updatedUser = await prisma.user.update({
      data: {
        bio,
        name,
        phone: newPhone,
        password: hashedPassword,
        email,
      },
      where: {
        email: email,
      },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: `Update Error: ${error.message}` });
      return;
    }
    res.status(500).json({ message: `Update Unexpected Error: ${error}` });
  }
};
