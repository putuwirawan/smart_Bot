import mongoose from "mongoose";
const Schema = mongoose.Schema;



const TransactionSchema = new Schema({
    exchangeId: { type: Schema.Types.ObjectId, ref: 'Exchange' },
    settingId: { type: Schema.Types.ObjectId, ref: 'Setting' },
    userId: { type: Schema.Types.ObjectId, ref: 'Sser' },
    indexOrder: {
        type: Number,
        required: true,
        default: 0
    },
    totQty: {
        type: Number,
        required: true,
        default: 0
    },
    totAmount: {
        type: Number,
        required: true,
        default: 0
    },
    transactionOrder: [{
        orderId: { type: String,},
        bOrderId: { type: String, },
        executedQty: { type: String, },
        executedPrice: { type: String, },
        executedQuoteQty: { type: String, }
    }],


}, {
    timestamps: true
});

export default TransactionSchema;