import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ReportSchema = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: "User" },
		exchangeId: { type: Schema.Types.ObjectId, ref: "Exchange" },
		isRead: { type: Boolean, default: false },
		message: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

export default ReportSchema;
