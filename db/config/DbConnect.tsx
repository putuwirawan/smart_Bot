import mongoose from "mongoose";

mongoose.set("strictQuery", false);
async function dbConnect() {
	const dburl: string =
		process.env.DATABASE_LOCAL || "mongodb://localhost:27017/katul";
	if (mongoose.connection.readyState >= 1) {
		return;
	}

	return mongoose.connect(dburl).then(() => {
		console.log("DB Connection Successful");
	});
}

export default dbConnect;
