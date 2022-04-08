import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    Name: { type: String, required: true, trim: true},
    Email: { type: String, required: true, trim: true, unique: true},
    password: { type: String, required: true, trim: true}
})


const UserModel = mongoose.model('user', userSchema);

export default UserModel;