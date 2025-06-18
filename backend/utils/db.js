import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI );
    console.log('mongo connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error; // Let the caller handle the error
  }
};

export default connectDB;