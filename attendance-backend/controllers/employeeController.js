// const Employee = require('../models/Employee');

// exports.createEmployee = async (req, res) => {
//   try {
//     const employee = new Employee(req.body);
//     await employee.save();
//     res.status(201).json(employee);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// exports.getAllEmployees = async (req, res) => {
//   const employees = await Employee.find();
//   res.json(employees);
// };
const Employee = require('../models/Employee');

// 🔹 Create Employee
exports.createEmployee = async (req, res) => {
  try {
    const { name, email, department, position, photo } = req.body;

    // 1️⃣ Basic validation
    if (!name?.trim() || !email?.trim() || !department?.trim() || !position?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name, email, department and position are required. Empty fields not allowed."
      });
    }

    const formattedEmail = email.trim().toLowerCase();

    // 2️⃣ Duplicate check
    const existingEmployee = await Employee.findOne({ email: formattedEmail });
    if (existingEmployee) {
      return res.status(409).json({
        success: false,
        message: "Employee with this email already exists."
      });
    }

    // 3️⃣ Create employee
    const employee = await Employee.create({
      name: name.trim(),
      email: formattedEmail,
      department: department.trim(),
      position: position.trim(),
      photo: photo || ""
    });

    res.status(201).json({
      success: true,
      message: "Employee created successfully.",
      data: employee
    });

  } catch (err) {

    // Mongo duplicate safety
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Duplicate entry detected. Email must be unique."
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error while creating employee."
    });
  }
};


// 🔹 Get All Employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: employees.length,
      data: employees
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching employees."
    });
  }
};
