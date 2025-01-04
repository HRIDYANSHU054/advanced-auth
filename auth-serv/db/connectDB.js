import mongoose from "mongoose";

export async function connectDB() {
  try {
    const connection = await mongoose.connect(process.env.MONGO_CONNECT_URI);
    console.log("db Connected", connection.connection.host);
  } catch (error) {
    console.log("Error while connecting to the db", error.message);
    process.exit(1); //1 is failure, 0 is success!
  }
}
