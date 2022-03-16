import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema(
	{
		password: {
			type: String,
			trim: true,
		},

		email: {
			type: String,
			unique: true,
			required: [true, "Email cannot be empty"],
			trim: true,
			lowercase: true,
			validate: [validator.isEmail],
		},
		photo: {
			type: String,
			default: "default-user.jpg",
		},
		exchangeConnect: [
			{
				name: { type: String },
				key: { type: String },
			},
		],
		role: {
			type: String,
			enum: ["new", "member", "admin"],
			default: "new",
		},

		active: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);



export default UserSchema;
