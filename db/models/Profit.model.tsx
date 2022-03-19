import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProfitSchema = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: "User" },
		exchangeId: { type: Schema.Types.ObjectId, ref: "Exchange" },
		profits: { type: String },
		transaction: [
			{
				name: { type: String },
				value: { type: String },
				time: {
					type: String,
					default: new Date(Date.now()).toLocaleTimeString(),
				},
			},
		],
		date: {
			type: String,
			required: true,
			default: new Date(Date.now()).toLocaleDateString(),
		},
	},
	{
		timestamps: true,
	}
);

export default ProfitSchema;
