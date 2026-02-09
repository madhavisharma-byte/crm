
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Inventory from './models/InventoryItem.js';

dotenv.config();

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const count = await Inventory.countDocuments();
        console.log(`Current Count: ${count}`);

        if (count === 0) {
            console.log('Seeding one item...');
            await Inventory.create({
                title: "Test Product",
                sku: "TEST-001",
                quantity: 100,
                price: 500,
                category: "Test",
                costPrice: 200,
                mrp: 600,
                lowStockThreshold: 10,
                metadata: { description: "Seeded for testing" }
            });
            console.log('Buffered 1 item.');
        } else {
            console.log('DB not empty, skipping seed.');
        }

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
