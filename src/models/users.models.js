import { Schema, model } from "mongoose";
import mongoosePaginte from 'mongoose-paginate-v2'

const userCollection = 'users'

const userSchema = new Schema({
    first_name: {
        type: String,
        index: true
    },
    last_name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    role: {
        type: String,
        default: 'user'
    }
})

userSchema.plugin(mongoosePaginte)

export const userModel = model(userCollection, userSchema)