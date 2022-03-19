import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SettingSchema = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
		pairId: { type: Schema.Types.ObjectId, ref: "Pair", required: true },
		exchangeId: {
			type: Schema.Types.ObjectId,
			ref: "Exchange",
			required: true,
		},
		isCycle: { type: Boolean, default: true },
		isOpenMargin: { type: Boolean, default: true },
		isActive: { type: Boolean, default: false },
		firstBuy: { type: String, default: "30000" },
		startPossition: { type: String, default: "" },
		closePossition: { type: String, default: "" },
		lastTradePossition: { type: String },
		callBackBuy: { type: String, default: ".3" },
		callBackSell: { type: String, default: ".25" },
		candleBody: { type: String, default: ".5" },
		takeProfit: { type: String, default: "5" },
		callLimit: { type: String, default: "3" },
		indexUp: { type: String, default: "0,3" },
		indexDown: { type: String, default: "1.5" },
		backTradeDrop: { type: String },
		rsi: { type: String, default: "85" },
		marginConfig: [
			{
				target: { type: String },
				value: { type: String },
			},
		],
		profitDistribution: [{ type: String }],
		strategy: {
			type: String,
			enum: ["Whole", "Sub-Bin"],
			default: "Whole",
		},
		tradeType: {
			type: String,
			enum: ["BarBar", "Aggressive", "Conservative"],
			default: "Conservative",
		},
		timeFrame: {
			type: String,
			enum: ["15m", "1h", "2h", "4h", "6h", "1d", "1w"],
			default: "1d",
		},
		movingAverage: {
			s: { type: String, default: "8" },
			m: { type: String, default: "20" },
			l: { type: String, default: "50" },
		},
	},
	{
		timestamps: true,
	}
);


export default SettingSchema;
