
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Inventory from './models/InventoryItem.js';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const count = await Inventory.countDocuments();
        console.log(`Total Inventory Items: ${count}`);

        if (count > 0) {
            const items = await Inventory.find().limit(5);
            console.log('Sample Items:', JSON.stringify(items, null, 2));
        }

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

connectDB();
