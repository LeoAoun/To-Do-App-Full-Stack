import { Router } from "express";
import { UserService } from "../services/UserService";
import { TodoService } from "../services/TodoService";
import { AuthMiddleware } from "../Middlewares/AuthMiddleware";

export const router = Router();

const todoService = new TodoService();
const userService = new UserService();

router.post("/register", userService.register);
router.post("/login", userService.login);
router.get("/user", userService.getUsers);
router.delete("/user/delete/:id", userService.deleteUser);

router.post("/todo", AuthMiddleware, todoService.createTodo);
router.get("/todo", AuthMiddleware, todoService.getTodos);
router.put("/todo/:id", AuthMiddleware, todoService.updateTodo);
router.delete("/todo/delete/:id", AuthMiddleware, todoService.deleteTodo);

router.get("/todo/user/:id", AuthMiddleware, userService.getTodosByUser);
