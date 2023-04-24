import mongoose from "mongoose";

const MONGODB_URI = process.env.DB_URL || "";

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

/**
 * 글로벌은 여기에서 핫 리로드에서 캐시된 연결을 유지하는 데 사용됩니다.
 * 개발 중. 이렇게 하면 연결이 기하급수적으로 증가하는 것을 방지할 수 있습니다.
 */
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default dbConnect;
