import mongoose from "mongoose";

const EsUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 5,
    max: 255,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
});
const UserModel = mongoose.model("UserModel", EsUserSchema);
export default UserModel;
