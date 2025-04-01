import { Request, Response, NextFunction } from "express";
import { registerUser, loginUser, getListOfUsers, deleteUser } from "../services/Auth.service";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { decrypt, encrypt } from "../utils/encruption";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || "SecretKey";


export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getListOfUsers();
    res.json({ success: true, users });
  } catch (error) {
    next(error);
  }
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, name, password, age, role } = req.body;

    if (!email || !name || !password || !age || !role) {
      return res.status(400).json({ message: "Мэдээлэл дутуу байна гүйцээж бөгөлнө үү!!!" });
    }

    const encryptedPassword = await encrypt(password);

    const user = await registerUser(email, name, encryptedPassword, age, role);

    res.status(201).json({ success: true, user, message: "Хэрэглэгч амжилттай бүртгэгдлээ!" });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email болон нууц үгээ оруулна уу!!!" });
    }

    const result = await loginUser(email, password);
    if (!result) throw new Error("Ийм бүртгэл олдсонгүй");
    
      try {
        const decryptedPassword = decrypt(result.password);
        if (decryptedPassword !== password) throw new Error("Нууц үг буруу байна!");
      } catch (error) {
        throw new Error("Нууц үг баталгаажуулалт алдаа гарлаа.");
      }
    
      const token = jwt.sign({ id: result.id, email: result.email, role: result.role }, SECRET_KEY, { expiresIn: "1h" });
    
    res.json({ success: true,token: token, data: result, message: "Нэвтрэх амжилттай" });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await deleteUser(Number(id));
    res.json({ success: true, message: "User deleted" });
  } catch (error) {
    next(error);
  }
};