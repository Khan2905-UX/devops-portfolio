const mongoose = require("mongoose");

async function connectMongoDB() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  await mongoose.connect(process.env.MONGODB_URI);
}

async function checkMongoDB() {
  await connectMongoDB();
  await mongoose.connection.db.admin().ping();
}

module.exports = {
  connectMongoDB,
  checkMongoDB,
};