/* eslint-disable @typescript-eslint/no-extraneous-class */
import mongoose, { Schema, type Document } from 'mongoose';

export interface User extends Document {
    name: string;
    email: string;
    password: string;

    projectIds: Schema.Types.ObjectId[];

    transactionIds: Schema.Types.ObjectId[];

    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<User>(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            lowercase: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },

        projectIds: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Project'
            }
        ],

        transactionIds: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Transaction'
            }
        ]
    },
    {
        timestamps: true
    }
);

export default mongoose.model<User>('User', userSchema);
