import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`Mongo DB connected: ${conn.connection.host}`.blue.bold);
  } catch (error) {
    console.error(`Error ${error}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDb;
