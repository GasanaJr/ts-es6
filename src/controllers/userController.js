import UserModel from "../models/UserModel";
import bcrypt from "bcrypt";

const createUser = async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(403).json({ message: "Fill All Required Fields" });
  }
  try {
    const dbuser = await UserModel.find({ email: email });
    if (dbuser) {
      return res
        .status(400)
        .json({ message: "Email Already Exists in the database" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new UserModel({ email, password: hashedPassword, name });
    await user.save();
    return res.status(201).json({ message: "User created", user: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

export { createUser };
