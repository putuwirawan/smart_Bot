import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PairSchema = new Schema({
	symbol: { type: String, unique:true },
	baseAsset: { type: String },
	quoteAsset: { type: String, enum: ["BIDR", "USDT"], default: "BIDR" },
	minQty: { type: String, default: "" },
	minOrder: { type: String, default: "10" },
	lastPrice: { type: String, default: "" },
	priceChangePercent: { type: String, default: "" },
	quoteVolume: { type: String, default: "" },
	url: { type: String },
});


export default PairSchema;
