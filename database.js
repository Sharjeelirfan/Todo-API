import mongoose from "mongoose";

const mongodbUri =
  "mongodb+srv://Sharjeel:sk2252004@practicecluster.wughe.mongodb.net/?retryWrites=true&w=majority&appName=PracticeCluster";
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(mongodbUri, {
      dbName: "myVirtualDatabase",
    });

    console.log(`\n🌿 MongoDB connected ! 🍃\n`);

    mongoose.connection.on(
      "error",
      console.error.bind(console, "Connection error:")
    );

    process.on("SIGINT", () => {
      // Cleanup code
      mongoose.connection.close();

      console.log("Mongoose connection closed due to application termination");
      process.exit(0);
    });
  } catch (error) {
    console.error("MONGODB connection FAILED ", error);
    process.exit(1); // Exited with error
  }
};

try {
  await connectDB();
} catch (err) {
  console.log("🚀 ~ main file ~ err:", err);
}
