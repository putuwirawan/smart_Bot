import mongoose from "mongoose";
import * as dotenv from "dotenv";

mongoose.set("strictQuery", false);
async function dbConnect() {
	dotenv.config();
	const dburl: string  =
		process.env.DATABASE || '' //"mongodb://localhost:27017/katul";
	if (mongoose.connection.readyState >= 1) {
		return;
	}

	return mongoose.connect(dburl).then(() => {
		console.log("DB Connection Successful");
	});
}

export default dbConnect;
