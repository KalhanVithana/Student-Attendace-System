let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//  Model
let studentSchema = require("../Models/studentModel");
let lectureSchema = require("../Models/lecturerModel");
let adminSchema = require("../Models/adminModel");
let lecSession = require("../Models/lecSession");
let PaymentAccount = require("../Models/PaymentModel");
const auth = require("../middleware/auth");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

// CREATE REGISTER
router.route("/register").post(async (req, res) => {
  try {
    const { name, email, gender, password } = req.body;

    let lecture = email.includes("@lec.com");
    let admin = email.includes("@admin.com");
    console.log("password",password);

    if(password.length < 5) {
      return res.status(400).json({ msg: `Password should be more than 5` });
    }

    if (lecture) {
      const existingUser = await lectureSchema.findOne({ email: email });
      if (existingUser) {
        return res.status(400).json({ msg: `user alreay exists  ` });
      }
      const salt = await bcrypt.genSalt();

      const passwordhash = await bcrypt.hash(password, salt);
      console.log(passwordhash);
      let userID = "IHM";
      let randomstring = Math.floor(Math.random() * 1000 *100);
      let genarateId = userID.concat(randomstring);

      let NewUser = new lectureSchema({
        name,
        email,
        gender,
        role: "lecture",
        instructorId: genarateId,
        password: passwordhash,
      });
      const saveUser = await NewUser.save();

      console.log(saveUser);
      return res.json(saveUser);
    }
    if (admin) {
      const existingUser = await adminSchema.findOne({ email: email });
      if (existingUser) {
        return res.status(400).json({ msg: `user alreay exists  ` });
      }
      const salt = await bcrypt.genSalt();

      const passwordhash = await bcrypt.hash(password, salt);
      console.log(passwordhash);
      let userID = "IHM";
      let randomstring = Math.floor(Math.random() * (1000 - 100) + 100) / 100;
      let genarateId = userID.concat(randomstring);

      let NewUser = new adminSchema({
        name,
        email,
        gender,
        role: "admin",
        instructorId: genarateId,
        password: passwordhash,
      });

      const saveUser = await NewUser.save();
      console.log(saveUser);
      return res.json(saveUser);
    } else {
      const existingUser = await studentSchema.findOne({ email: email });
      if (existingUser) {
        return res.status(400).json({ msg: `user alreay exists  ` });
      }
      const salt = await bcrypt.genSalt();

      const passwordhash = await bcrypt.hash(password, salt);
      console.log(passwordhash);
      let userID = "IHM";
      let randomstring = Math.floor(Math.random() * (1000 - 100) + 100) / 100;
      let genarateId = userID.concat(randomstring);

      console.log("genarateId",genarateId)
      let NewUser = new studentSchema({
        stdId:genarateId,
        name,
        email,
        gender,
        role: "student",
        password: passwordhash,
      });

      const saveUser = await NewUser.save();
      console.log(saveUser);
      return res.json(saveUser);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.route("/login").post(async (req, res) => {
  try {
    const { email, password } = req.body;

    let lecture = email.includes("@lec.com");
    let admin = email.includes("@admin.com");

    if (lecture) {
      const user = await lectureSchema.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ msg: `No User existing in this email ` });
      }
      const ismatch = await bcrypt.compare(password, user.password);
      if (!ismatch) {
        return res.status(400).json({ msg: "email or password invalid " });
      }

      const token = jwt.sign({ id: user._id }, "#123");
      return res.json({
        token,
        user: {
          id: user._id,
          role: user.role,
        },
      });
    }
    if (admin) {
      const user = await adminSchema.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ msg: `No User existing in this email ` });
      }
      const ismatch = await bcrypt.compare(password, user.password);
      if (!ismatch) {
        return res.status(400).json({ msg: "email or password invalid " });
      }

      const token = jwt.sign({ id: user._id }, "#123");
      return res.json({
        token,
        user: {
          id: user._id,
          role: user.role,
        },
      });
    } else {
      const user = await studentSchema.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ msg: `No User existing in this email ` });
      }
      const ismatch = await bcrypt.compare(password, user.password);
      if (!ismatch) {
        return res.status(400).json({ msg: "email or password invalid " });
      }

      const token = jwt.sign({ id: user._id }, "#123");
      return res.json({
        token,
        user: {
          id: user._id,
          role: user.role,
        },
      });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.route("/up").put(auth, async (req, res) => {
  try {
    const { classId, enroll, courseName } = req.body;

    const findCourseId = await lecSession.findOne({ classId: classId });

    if (!findCourseId)
      return res.status(401).json({ msg: " no course avalible" });

    const SaveCourse = new lecSession({
      enroll: req.user,
    });

    const UpdateData = await lecSession.findOneAndUpdate(
      { classId: classId },
      { $push: { enroll: req.user } },
      { new: true }
    );
    //findCourseId._id,
    console.log(UpdateData);
    res.json(UpdateData);
  } catch (e) {
    console.log(e);
  }
});

router.route("/add").post(auth, async (req, res) => {
  try {
    const { classId, lecDate, lecTime, courseName } = req.body;

    const findCourseId = await lecSession.findOne({ classId: classId });

    if (findCourseId)
      return res.status(401).json({ msg: " Class Id already exsist" });

    const SaveCourse = new lecSession({
      classId,
      lecDate,
      lecTime,
      courseName,
      lecturerID: req.user,
    });

    const UpdateData = await SaveCourse.save();

    console.log(UpdateData);

    res.json({ msg: "course insert sucessfully" });
  } catch (e) {
    console.log(e);
  }
});

router.route("/uid").get(auth, (req, res) => {
  // let role = req.query.role;
  // let user = req.user;
  // if (role == "lecture") {
  //   lectureSchema.findOne({ _id: user }).exec((err, user) => {
  //     if (err) {
  //       return res.status(400).send({ status: "FAIL" });
  //     } else {
  //       return res.json(user);
  //     }
  //   });
  // }

  const { role } = req.query;
  console.log(role);
  try {
    if (role == "lecture") {
      lectureSchema.findOne({ _id: req.user }).exec((err, user) => {
        if (err) {
          return res.status(400).send({ status: "FAIL" });
        } else {
          console.log("user", user);
          return res.status(200).json(user);
        }
      });
    }
    if (role == "student") {
      studentSchema.findById(req.user).exec((err, user) => {
        if (err) {
          return res.status(400).send({ status: "FAIL" });
        } else {
          console.log("user", user);
          return res.status(200).json(user);
        }
      });
    }
    if (role == "admin") {
      adminSchema.findById(req.user).exec((err, user) => {
        if (err) {
          return res.status(400).send({ status: "FAIL" });
        } else {
          console.log("user", user);
          return res.status(200).json(user);
        }
      });
    }
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.route("/get/session").get(auth, async (req, res) => {
  const userIDData = await lecSession.find({ lecturerID: req.user });
  res.json(userIDData);
});

router.route("/session/up").put(auth, async (req, res) => {
  const { classId, lecDate, lecTime, courseName } = req.body;

  const sessionUpdate = await lecSession.findOneAndUpdate(
    { classId: classId },
    {
      $set: {
        lecDate: lecDate,
        lecTime: lecTime,
        courseName: courseName,
      },
    },
    { new: true }
  );
  res.json(sessionUpdate);
  console.log(sessionUpdate);
});

router.route("/get/std").get(auth, async (req, res) => {
  const userIDData = await lecSession.find({ enroll: req.user });
  res.json(userIDData);
});

router.route("/get/all").get(auth, (req, res) => {
  lecSession.find((err, data) => {
    if (err) {
      return next(err);
    } else {
      res.json(data);
    }
  });
});

router.route("/get/users").get((req, res) => {
  console.log(req.query);
  if (req.query.role == "lecture") {
    console.log("user");
    lectureSchema.find((err, data) => {
      if (err) {
        return next(err);
      } else {
        console.log(data);
        res.json(data);
      }
    });
  } else {
    studentSchema.find((err, data) => {
      if (err) {
        return next(err);
      } else {
        res.json(data);
      }
    });
  }
});

router.route("/get/delete").delete(async (req, res) => {
  try {
    const { id } = req.body;
    const deleteID = await lecSession.findOneAndRemove(id);
    res.json(deleteID);
    console.log(deleteID);
  } catch (e) {
    console.log(e);
  }
});

router.route("/get/update").put(auth, async (req, res) => {
  const { role, id } = req.body;

  try {
    if (role === "lecture") {
      const data = await lectureSchema.findByIdAndUpdate(id, {
        $set: req.body,
      });
      console.log(data);
      res.json(data);
    } else if (role === "student") {
      const data = await studentSchema.findByIdAndUpdate(id, {
        $set: req.body,
      });
      console.log(data);
      res.json(data);
    }
  } catch (e) {
    console.log(e);
  }
});

router.route("/at").put(auth, async (req, res) => {
  const { classId } = req.body;

  const findStudent = await studentSchema.findById(req.user);

  const { name, email } = findStudent;
  const date = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Ho_Chi_Minh",
  });

  let time = date;
  const stdAttendace = {
    name,
    email,
    time,
  };

  const user = await lecSession.findOneAndUpdate(
    { classId: classId },
    { $push: { attendance: stdAttendace } },
    { new: true }
  );
  res.json(user);
});

router.route("/en").put(auth, async (req, res) => {
  try {
    const { id, value } = req.body;
    console.log("classID", id);
    console.log("value", value);

    let classID = await lecSession.findOneAndUpdate(
      { classId: id },
      {
        $set: {
          enableCourse: value,
        },
      },
      { new: true }
    );

    console.log(classID);

    res.json(classID);
  } catch (e) {
    console.log(e);
  }
});

router.post("/account", upload.single("images"), auth, async (req, res) => {
  try {
    // Upload image to cloudinary
    const { AreaOffice, accountNo, mobileNo, courseId } = req.body;

    console.log("courseId", courseId,AreaOffice);

    const user = await studentSchema.findById({ _id: req.user });

    const result = await cloudinary.uploader.upload(req.file.path);

    // const checkAcc = await PaymentAccount.findOne({ courseId: courseId });
    // console.log("checkAcc",checkAcc);
    // if (checkAcc) return res.status(400).json({ msg: `already exsist ` });

    let saveAcc = new PaymentAccount({
      AreaOffice,
      accountNo,
      mobileNo,
      courseId,
      customerEmail: user.email,
      customerId: req.user,
      avatar: result.secure_url,
      cloudinary_id: result.public_id,
    });

    let regiserAcc = await saveAcc.save();
    res.json(regiserAcc);
    console.log(regiserAcc);
  } catch (err) {
    console.log(err);
  }
});

router.route("/payacc").get(auth, (req, res) => {
  try {
    PaymentAccount.find((err, data) => {
      if (err) {
        return next(err);
      } else {
        res.json(data);
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.route("/delete/:id").delete(async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const resData = await PaymentAccount.findByIdAndDelete({ _id: id });

    console.log(resData);
    res.json(resData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
