/* eslint-disable @typescript-eslint/no-extraneous-class */
import mongoose, { Schema, type Document } from 'mongoose';

export interface Transaction extends Document {
    name: string;

    projectId: Schema.Types.ObjectId;

    ownerId: Schema.Types.ObjectId;

    users: Array<{
        userId: Schema.Types.ObjectId;
        amount: number;
    }>;

    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<Transaction>(
    {
        name: {
            type: String,
            required: true
        },

        ownerId: {
            type: String,
            ref: 'User',
            required: true
        },

        users: [
            {
                userId: {
                    type: String,
                    ref: 'User',
                    required: true
                },
                amount: {
                    type: Number,
                    required: true
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

export default mongoose.model<Transaction>('Transaction', userSchema);
