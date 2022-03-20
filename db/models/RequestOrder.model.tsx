import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RequestOrderSchema = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: "User" },
		pairId: { type: Schema.Types.ObjectId, ref: "Pair" },
		exchangeId: { type: Schema.Types.ObjectId, ref: "Exchange" },
		isCheck: { type: Boolean, default: false },
		baseId: { type: String, default: "" },
		orderId: { type: String, default: "" },
		side: { type: Number, default: 0 },
		quantity: { type: String, default: "" },
		amount: { type: String, default: "" },
		price: { type: String, default: "" },
	},
	{
		timestamps: true,
	}
);


export default RequestOrderSchema;
