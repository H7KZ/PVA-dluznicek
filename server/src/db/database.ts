import mongoose, { type ConnectOptions } from 'mongoose';

class Database {
    public async connect(c: string): Promise<void> {
        try {
            await mongoose.connect(c, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            } as ConnectOptions);
        } catch (err) {
            if (err instanceof Error) {
                console.error(`⛔️ Mongoose Error!`);
                console.error(`⛔️ ${err.message}`);
                process.exit(1);
            }
        }
    }
}

export const IONTTDatabase = new Database();
