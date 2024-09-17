import mongoose from "mongoose";


const connect = async () => {
  try {
    const URL = `${process.env.MONGO_URL}/${process.env.MONGO_DB}`;

    await mongoose.connect(URL);

    console.log("Database connected successfully");
  } catch (error) {
    console.error(error);
    console.error("Database connection failed");
  }
};


export default connect;