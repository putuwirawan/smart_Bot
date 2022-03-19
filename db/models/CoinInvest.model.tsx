import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CoinInvestSchema = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: "User" },
		exchangeId: { type: Schema.Types.ObjectId, ref: "Exchange" },
		pairId: { type: Schema.Types.ObjectId, ref: "Pair" },
		order: {
			orderId: { type: String },
			bOrderId: { type: String },
			executedQty: { type: String },
			executedPrice: { type: String },
			executedQuoteQty: { type: String },
		},
	},
	{
		timestamps: true,
	}
);

export default CoinInvestSchema;
