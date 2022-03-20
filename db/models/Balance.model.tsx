import mongoose from "mongoose";
const Schema = mongoose.Schema;

const balanceType = {
    USDT: String,
    BIDR: String
}

const BalanceSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    balances: {
        binance: { type: balanceType, default: { USDT: '', BIDR: '' } },
        tokocrypto: { type: balanceType, default: { USDT: '', BIDR: '' } },
    },


}, {
    timestamps: true
});


export default BalanceSchema;