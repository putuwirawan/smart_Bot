import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: "User" },
		pairId: { type: Schema.Types.ObjectId, ref: "Pair" },
		exchangeId: { type: Schema.Types.ObjectId, ref: "Exchange" },
		baseId: { type: String },
		orderId: { type: String },
		side: { type: Number, default: 0 },
		price: { type: String },
		quantity: { type: String },
		amount: { type: String },
	},
	{
		timestamps: true,
	}
);

export default OrderSchema;
