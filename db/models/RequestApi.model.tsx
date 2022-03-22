import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RequestApiSchema = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
		exchangeId: {
			type: Schema.Types.ObjectId,
			ref: "Exchange",
			required: true,
		},

		apiKey: { type: String, default: "" },
		secretKey: { type: String, default: "" },
	},
	{
		timestamps: true,
	}
);

export default RequestApiSchema;
