import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProfitSchema = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: "User" },
		exchangeId: { type: Schema.Types.ObjectId, ref: "Exchange" },
		profit: { type: String },
		pairname: { type: String },
		datetime: { type: Number, default: new Date(Date.now()) },
		date: {
			type: Date,
			required: true,
			default: new Date(Date.now()).toLocaleDateString(),
		},
	},
	{
		timestamps: true,
	}
);

export default ProfitSchema;
