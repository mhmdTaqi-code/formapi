const express = require('express');
const mongoose = require('mongoose');

// إعداد التطبيق
const app = express();
const user = require("./models/user");
app.use(express.json());

// الاتصال بقاعدة البيانات باستخدام متغير بيئي
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// مسار POST لحفظ البيانات في قاعدة البيانات
app.post("/form", async (req, res) => {
  try {
    const newUser = new user({
      fullName: req.body.fullName,
      email: req.body.email,
      body: req.body.body
    });
    await newUser.save();
    const users = await user.find();
    res.status(201).json(users);
  } catch (err) {
    res.status(500).send("An error occurred while saving the user");
  }
});

// مسار GET لجلب البيانات من قاعدة البيانات
app.get("/form", async (req, res) => {
  try {
    const users = await user.find(); // جلب جميع المستخدمين من قاعدة البيانات
    res.status(200).json(users); // إرسال المستخدمين كـ JSON في الاستجابة
  } catch (err) {
    res.status(500).send("حدث خطأ أثناء استرجاع البيانات");
  }
});

// بدء الخادم باستخدام المتغير البيئي PORT أو المنفذ 3000 إذا لم يتم تحديده
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
