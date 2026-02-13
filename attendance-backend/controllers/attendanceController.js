// const Attendance = require('../models/Attendance');

// exports.checkIn = async (req, res) => {
//   const { employeeId } = req.body;
//   const today = new Date().toDateString();

//   const alreadyMarked = await Attendance.findOne({
//     employeeId,
//     date: { $gte: new Date(today) }
//   });

//   if (alreadyMarked) {
//     return res.status(400).json({ message: "Already checked in today" });
//   }

//   const newRecord = new Attendance({ employeeId, checkIn: new Date(), status: 'Present' });
//   await newRecord.save();
//   res.json(newRecord);
// };

// exports.checkOut = async (req, res) => {
//   const { employeeId } = req.body;

//   const record = await Attendance.findOne({ employeeId }).sort({ date: -1 });
//   if (!record || record.checkOut) {
//     return res.status(400).json({ message: "Check-in not found or already checked out" });
//   }

//   record.checkOut = new Date();
//   await record.save();
//   res.json(record);
// };

// exports.getAllAttendance = async (req, res) => {
//   const records = await Attendance.find().populate('employeeId', 'name email');
//   res.json(records);
// };
const Attendance = require('../models/Attendance');
const mongoose = require('mongoose');

// Helper: Start & End of Today
const getTodayRange = () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  return { start, end };
};



// 🔹 Check In
exports.checkIn = async (req, res) => {
  try {
    const { employeeId } = req.body;

    if (!employeeId || !mongoose.Types.ObjectId.isValid(employeeId)) {
      return res.status(400).json({
        success: false,
        message: "Valid employeeId is required."
      });
    }

    const { start, end } = getTodayRange();

    // Prevent duplicate check-in same day
    const alreadyMarked = await Attendance.findOne({
      employeeId,
      checkIn: { $gte: start, $lte: end }
    });

    if (alreadyMarked) {
      return res.status(409).json({
        success: false,
        message: "Attendance already marked for today."
      });
    }

    const newRecord = await Attendance.create({
      employeeId,
      checkIn: new Date(),
      status: "Present"
    });

    return res.status(201).json({
      success: true,
      message: "Check-in successful.",
      data: newRecord
    });

  } catch (err) {
    console.error("Check-in Error:", err);
    return res.status(500).json({
      success: false,
      message: `Check-in failed: ${err.message}`
    });
  }
};



// 🔹 Check Out
exports.checkOut = async (req, res) => {
  try {
    const { employeeId } = req.body;

    if (!employeeId || !mongoose.Types.ObjectId.isValid(employeeId)) {
      return res.status(400).json({
        success: false,
        message: "Valid employeeId is required."
      });
    }

    const { start, end } = getTodayRange();

    const record = await Attendance.findOne({
      employeeId,
      checkIn: { $gte: start, $lte: end }
    });

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "No check-in found for today."
      });
    }

    if (record.checkOut) {
      return res.status(409).json({
        success: false,
        message: "Already checked out today."
      });
    }

    record.checkOut = new Date();
    await record.save();

    return res.status(200).json({
      success: true,
      message: "Check-out successful.",
      data: record
    });

  } catch (err) {
    console.error("Check-out Error:", err);
    return res.status(500).json({
      success: false,
      message: `Check-out failed: ${err.message}`
    });
  }
};



// 🔹 Get All Attendance
exports.getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find()
      .populate('employeeId', 'name email department')
      .sort({ checkIn: -1 });

    return res.status(200).json({
      success: true,
      count: records.length,
      data: records
    });

  } catch (err) {
    console.error("Fetch Attendance Error:", err);
    return res.status(500).json({
      success: false,
      message: `Failed to fetch attendance: ${err.message}`
    });
  }
};
