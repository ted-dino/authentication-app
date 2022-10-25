import { User } from "@prisma/client";
import * as argon2 from "argon2";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prismadb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  try {
    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(400).json({
        message: "Invalid input - password should be at least 8 characters",
      });
      return;
    }

    const emailExists = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (emailExists) {
      res.status(418).json({
        message: "Email exists.",
      });
      return;
    }

    const hashedPassword = await argon2.hash(password);
    const newUser: User = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: "Anon",
        image: "https://via.placeholder.com/100",
        bio: "Credentials. Similique earum tenetur incidunt sed iure.",
      },
    });

    res.status(200).json(newUser);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: `Register Error: ${error.message}` });
    } else {
      res.status(500).json({ message: `Register Unexpected Error: ${error}` });
    }
  }
};
