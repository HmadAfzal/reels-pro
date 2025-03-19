import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI!

if (!MONGO_URI) {
    throw new Error("MONGODB_URI is not provided");
}

const cached = global.mongoose
if (!cached) {
    global.mongoose = { conn: null, promise: null }
}

export async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10,
        }
        cached.promise = mongoose
            .connect(MONGO_URI, opts)
            .then((mongoose) => {
                return mongoose.connection;
            }
            );
    }

    try {
        cached.conn = await cached.promise;
        return cached.conn;
    } catch {
        cached.conn = null;
        throw new Error("Failed to connect to database");
    }
}