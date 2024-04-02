const mongoose = require('mongoose');

mongoose.connect(
    "mongodb+srv://raymondeuginio:remon123@trymongo.nsaserq.mongodb.net/",
    {
        useNewUrlParser: true,
    }
);

const db = mongoose.connection;

db.once("open", () => {
    console.log("MongoDB database connection established successfully");
});

const memberSchema = mongoose.Schema({
    name: String,
    email: String,
    credit: Number,
});

const Member = mongoose.model("Member", memberSchema);

async function main() {
    try {
        const savedDoc = await Member.create({
            name: "Stacy",
            email: "stacy@gmail.com",
            credit: 123456,
        });
        console.log(savedDoc);

        const members = await Member.find({});
        console.log(members);

        const greg = await Member.find({ name: "Greg" }).exec();
        console.log(greg);

        const stacy = await Member.find({
            name: "Stacy",
            credit: { $gte: 100000 }
        }).exec();
        console.log(stacy);
    } catch (error) {
        console.error(error);
    } finally {
        // Close the database connection after all operations
        mongoose.disconnect();
    }
}

main();
