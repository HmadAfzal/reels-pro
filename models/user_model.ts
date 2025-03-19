import bcrypt from "bcryptjs";
import mongoose from "mongoose";

interface UserInterface {
    _id?: mongoose.Types.ObjectId;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}


const UserSchema = new mongoose.Schema<UserInterface>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });


UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
}
);

export const User = mongoose.models.User || mongoose.model<UserInterface>("User", UserSchema);