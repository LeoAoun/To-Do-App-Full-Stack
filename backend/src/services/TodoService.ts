import { Request, Response } from "express";
import { prisma } from "../prisma/prisma";

enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export class TodoService {
  async createTodo(req: Request, res: Response) {
    const { title, description, priority, userId } = req.body;

    if (!title) {
      return res.status(400).json({
        statusText: "Missing title",
      });
    }

    const titleLength = title.length;

    if (titleLength > 16) {
      return res.status(400).json({
        statusText: "Title too long",
      });
    }

    const titleExists = await prisma.todo.findFirst({
      where: {
        title: title,
      },
    });

    if (titleExists) {
      return res.status(400).json({
        statusText: "Title already exists",
      });
    }

    if (!Object.values(Priority).includes(priority)) {
      return res.status(400).json({
        statusText: "Invalid priority",
      });
    }

    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        priority,
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        user: true,
      },
    });

    return res.status(201).json(todo);
  }

  async getTodos(req: Request, res: Response) {
    const todos = await prisma.todo.findMany({
      include: {
        user: true,
      },
    });

    return res.status(200).json(todos);
  }

  async updateTodo(req: Request, res: Response) {
    const { id } = req.params;
    const { title, description, priority, completed } = req.body;

    if (!title || !priority) {
      return res.status(400).json({
        statusText: "Missing fields",
      });
    }

    if (!Object.values(Priority).includes(priority)) {
      return res.status(400).json({
        statusText: "Invalid priority",
      });
    }

    const todoExists = await prisma.todo.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!todoExists) {
      return res.status(400).json({
        statusText: "Todo not found",
      });
    }

    const todo = await prisma.todo.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        description,
        priority,
        completed,
      },
    });

    return res.status(200).json(todo);
  }

  async deleteTodo(req: Request, res: Response) {
    const { id } = req.params;

    await prisma.todo.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json({
      statusText: "Todo deleted",
    });
  }
}
