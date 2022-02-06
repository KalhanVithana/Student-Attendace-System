let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//  Model
let studentSchema = require("../Models/studentModel");
let lectureSchema = require("../Models/lecturerModel");
let lecSession = require("../Models/lecSession");
const auth = require("../middleware/auth");

// CREATE REGISTER
router.route("/register").post(async (req, res) => {
  try {
    const { name, email, gender, password } = req.body;

    let Role = email.includes("@lec.com");

    if (Role) {
      const existingUser = await lectureSchema.findOne({ email: email });
      if (existingUser) {
        return res.status(400).json({ msg: `user alreay exists  ` });
      }
      const salt = await bcrypt.genSalt();

      const passwordhash = await bcrypt.hash(password, salt);
      console.log(passwordhash);

      let NewUser = new lectureSchema({
        name,
        email,
        gender,
        role: "lecture",
        password: passwordhash,
      });

      const saveUser = await NewUser.save();

      res.json(saveUser);
      console.log(saveUser);
    } else {
      const existingUser = await studentSchema.findOne({ email: email });
      if (existingUser) {
        return res.status(400).json({ msg: `user alreay exists  ` });
      }
      const salt = await bcrypt.genSalt();

      const passwordhash = await bcrypt.hash(password, salt);
      console.log(passwordhash);

      let NewUser = new studentSchema({
        name,
        email,
        gender,
        role: "student",
        password: passwordhash,
      });

      const saveUser = await NewUser.save();

      res.json(saveUser);
      console.log(saveUser);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.route("/login").post(async (req, res) => {
  try {
    const { email, password } = req.body;

    let Role = email.includes("@lec.com");

    if (Role) {
      const user = await lectureSchema.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ msg: `No User existing in this email ` });
      }
      const ismatch = await bcrypt.compare(password, user.password);
      if (!ismatch) {
        return res.status(400).json({ msg: "email or password invalid " });
      }

      const token = jwt.sign({ id: user._id }, "#123");
      res.json({
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
      res.json({
        token,
        user: {
          id: user._id,
          role: user.role,
        },
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.route("/up").put(auth, async (req, res) => {
  try {
    const { classId, enroll } = req.body;

    const findCourseId = await lecSession.findOne({ classId: classId });

    if (!findCourseId)
      return res.status(401).json({ msg: " no course avalible" });

    const SaveCourse = new lecSession({
      enroll: req.user,
    });

    let checkEnroll = findCourseId.enroll.includes(req.user);

    if (checkEnroll) return res.status(400).json({ msg: "alredy exsist" });

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
    const { classId, lecDate, lecTime,department } = req.body;

    const findCourseId = await lecSession.findOne({ classId: classId });

    console.log(findCourseId);

    if (findCourseId)
      return res.status(401).json({ msg: "  course alredy exist" });

    const SaveCourse = new lecSession({
      classId,
      lecDate,
      lecTime,
      department,
      lecturerID: req.user,
    });

    const UpdateData = await SaveCourse.save();

    console.log(UpdateData);

    res.json({ msg: "course insert sucessfully" });
  } catch (e) {
    console.log(e);
  }
});

router.route("/uid").post(auth, async (req, res) => {
  const { role } = req.body;
  try {
    if (role === "student") {
      let user = await studentSchema.findById(req.user);

      res.json(user);
    } else if (role === "lecture") {
      let user = await lectureSchema.findById(req.user);

      res.json(user);
    } else {
      res.json("null");
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

router.route("/get/session").get(auth, async (req, res) => {
  const userIDData = await lecSession.find({ lecturerID: req.user });
  res.json(userIDData);
});

router.route("/session/up").put(auth, async (req, res) => {
  const { classId, lecDate, lecTime,department } = req.body;

  const sessionUpdate = await lecSession.findOneAndUpdate(
    { classId: classId },
    {
      $set: {
        lecDate: lecDate,
        lecTime: lecTime,
        department:department
      },
    },
    { new: true }
  );
  res.json(sessionUpdate);
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

module.exports = router;
