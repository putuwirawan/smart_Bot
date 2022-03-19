import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ExchangeSchema = new Schema(
	{
		name: { type: String, required: true, unique: true },
		code: { type: String, required: true, unique: true },
		currency: { type: String, default: "USDT" },
		url: { type: String },
	},
	{
		timestamps: true,
	}
);

export default ExchangeSchema;
