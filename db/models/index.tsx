import mongoose from "mongoose";
import UserSchema from "./User.model";
import ExchangeSchema from "./Exchange.model";
import PairSchema from "./Pair.model";
import SettingSchema from "./Setting.model";
import ReportSchema from "./Report.model";
import ProfitSchema from "./Profit.model";
import TransactionSchema from "./Transaction.model";
import CoinInvestSchema from "./CoinInvest.model";
import OrderSchema from "./Order.model";
import BalanceSchema from "./Balance.model";
import RequestOrderSchema from "./RequestOrder.model";

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
export const Exchange =
	mongoose.models.Exchange || mongoose.model("Exchange", ExchangeSchema);
export const Pair = mongoose.models.Pair || mongoose.model("Pair", PairSchema);
export const Setting =
	mongoose.models.Setting || mongoose.model("Setting", SettingSchema);

export const Report =
	mongoose.models.Report || mongoose.model("Report", ReportSchema);
export const Profit =
	mongoose.models.Profit || mongoose.model("Profit", ProfitSchema);
export const Transaction =
	mongoose.models.Transaction ||
	mongoose.model("Transaction", TransactionSchema);

export const Coininvest =
	mongoose.models.Coininvest || mongoose.model("Coininvest", CoinInvestSchema);

export const Order =
	mongoose.models.Order || mongoose.model("Order", OrderSchema);

export const Balance =
	mongoose.models.Balance || mongoose.model("Balance", BalanceSchema);

export const Requestorder =
	mongoose.models.Requestorder ||
	mongoose.model("Requestorder", RequestOrderSchema);
