const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const EMAIL = "admin@example.com";
const PASSWORD = "admin123";

(async () => {
  await mongoose.connect("mongodb://localhost:27017/nuzio_ai");
  const users = mongoose.connection.db.collection("users");

  const hash = await bcrypt.hash(PASSWORD, 10);

  await users.updateOne(
    { email: EMAIL },
    {
      $set: {
        email: EMAIL,
        password: hash,
        name: "Admin Test",
        profession: "Technology",
        interests: [
          "Technology",
          "Artificial Intelligence",
          "Software Development"
        ],
        onboardingCompleted: true,
        updatedAt: new Date()
      },
      $setOnInsert: { createdAt: new Date() }
    },
    { upsert: true }
  );

  const u = await users.findOne({ email: EMAIL });
  const ok = await bcrypt.compare(PASSWORD, u.password);

  console.log("USER:", EMAIL);
  console.log("bcrypt.compare ->", ok);

  await mongoose.disconnect();
})();