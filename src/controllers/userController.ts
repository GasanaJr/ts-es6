import UserModel from "../models/UserModel";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

const createUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    res.status(403).json({ message: "Fill All Required Fields" });
    return;
  }
  try {
    const dbuser = await UserModel.find({ email: email });
    if (dbuser) {
       res
        .status(400)
        .json({ message: "Email Already Exists in the database" });
        return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new UserModel({ email, password: hashedPassword, name });
    await user.save();
     res.status(201).json({ message: "User created", user: user });
     return;
  } catch (error) {
    console.log(error);
     res.status(500).json({ error: error });
     return;
  }
};

export { createUser };
