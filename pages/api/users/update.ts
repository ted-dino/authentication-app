import { User } from "@prisma/client";
import * as argon2 from "argon2";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prismadb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let body = req.body;
  let formattedPhone: Number;
  let hashedNewPass: String;

  try {
    if (body.phone) {
      formattedPhone = Number(body.phone);
      body = { ...body, phone: formattedPhone };
    }
    if (body.password) {
      hashedNewPass = await argon2.hash(body.password);
      body = { ...body, password: hashedNewPass };
    }

    const updatedUser = await prisma.user.update({
      data: body,
      where: {
        email: body.email,
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
