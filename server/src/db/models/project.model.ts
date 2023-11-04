/* eslint-disable @typescript-eslint/no-extraneous-class */
import mongoose, { Schema, type Document } from 'mongoose';

export interface Project extends Document {
    name: string;

    ownerId: Schema.Types.ObjectId;

    userIds: Schema.Types.ObjectId[];

    transactionIds: Schema.Types.ObjectId[];

    createdAt: Date;
    updatedAt: Date;
}

const projectSchema = new Schema<Project>(
    {
        name: {
            type: String,
            required: true
        },

        ownerId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        userIds: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
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

export default mongoose.model<Project>('Project', projectSchema);
