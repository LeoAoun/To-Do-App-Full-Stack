import { Request, Response } from "express";
import { prisma } from "../prisma/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export class UserService {
  async register(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        statusText: "Missing email or password",
      });
    }

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return res.status(400).json({
        statusText: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json(user);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        statusText: "Missing email or password",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({
        statusText: "User not found",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({
        statusText: "Incorrect password",
      });
    }

    // const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: "1d" });
    const token = jwt.sign({ id: user.id }, "JWT_SECRET_TEST", {
      expiresIn: "1d",
    });

    return res.status(200).json({ user, token });
  }

  async getTodosByUser(req: Request, res: Response) {
    const { id } = req.params;

    const todos = await prisma.todo.findMany({
      where: {
        userId: Number(id),
      },
    });

    return res.status(200).json(todos);
  }

  async getUsers(req: Request, res: Response) {
    const users = await prisma.user.findMany({
      include: {
        todos: true,
      },
    });

    return res.status(200).json(users);
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    await prisma.todo.deleteMany({
      where: {
        userId: Number(id),
      },
    });

    await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json({
      statusText: "User deleted",
    });
  }
}
