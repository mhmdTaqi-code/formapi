const express = require('express');
const mongoose = require('mongoose');


// إعداد التطبيق
const app = express();
const user = require("./models/user")
app.use(express.json());

// الاتصال بقاعدة البيانات
mongoose.connect("mongodb+srv://mdtqi2p:T90M3dplGpGZLs1A@firstdatabase.o439i.mongodb.net/?retryWrites=true&w=majority&appName=firstdatabase")
  .then(() => {
    console.log("done!");
  })
  .catch((error) => {
console.log("erorr")  });



app.post("/form", async (req, res) => {
  try {
    const newusser = new user({
      fullName: req.body.fullName,
      email: req.body.email,
      body: req.body.body
    });
    await newusser.save();
    const users = await user.find();
    res.status(201).json(users);
  } catch (err) {
    res.status(500).send("An error occurred while saving the user");
  }
});



  app.get("/form", async (req, res) => {
    try {
      const users = await user.find(); // جلب جميع المستخدمين من قاعدة البيانات
      res.status(200).json(users); // إرسال المستخدمين كـ JSON في الاستجابة
    } catch (err) {
      res.status(500).send("حدث خطأ أثناء استرجاع البيانات");
    }
  });


// بدء الخادم
app.listen(3000, () => {
  console.log("server is run");
});
