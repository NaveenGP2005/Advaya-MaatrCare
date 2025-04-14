require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require('cors');
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const multer = require("multer");
const jwt = require('jsonwebtoken');
const app = express();
const PORT = process.env.PORT || 5000;
const userRouter = require("./routers/userroute");
const anyRouter = require("./routers/anyrouter");
const User = require("./models/user");
const Doctor = require("./models/doctor");


// Middleware
app.use(cors({
    origin: 'https://advaya-maatrcare-front.onrender.com', // Your frontend URL
    credentials: true
}));
app.use(bodyParser.json());
app.use(express.json());

// Auth middleware
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// MongoDB Connections
app.use("/user", userRouter);
app.use("/home", anyRouter);

// Routes
const doctorRoutes = require('./routers/doctorRoutes');
const patientRoutes = require('./routers/patientRoutes');

// Use routes
app.use('/doctor', doctorRoutes);
app.use('/patient', patientRoutes);

// Additional endpoint for patient search (used by doctors)
app.get('/api/doctor/search-patients', authMiddleware, async (req, res) => {
    try {
        const { email } = req.query;
        const patients = await User.find({
            email: { $regex: email, $options: 'i' }
        }).select('name email');
        
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Additional endpoint for patient files (used by doctors)
app.get('/api/doctor/patient-files/:patientId', authMiddleware, async (req, res) => {
    try {
        const { patientId } = req.params;
        const FileAccess = require('./models/fileAccess');
        const files = await FileAccess.find({ patientId });
        res.json(files);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Schemas and Models
 

const appointmentSchema = new mongoose.Schema({
    userId: String,
    doctorId: String,
    date: String,
    time: String,
});

const medSchema = new mongoose.Schema({
    name: String,
    dosage: String,
    time: String,
    taken: { type: Boolean, default: false },
});

const fileSchema = new mongoose.Schema({
    cid: { type: String, required: true, unique: true },
    fileName: String,
    aesKey: String,
    iv: String,
    patientId: String,
    allowedDoctors: [String],
    uploadedAt: { type: Date, default: Date.now }
});


const Appointment = mongoose.model("Appointment", appointmentSchema);
const Medication = mongoose.model("Medication", medSchema);
const File = mongoose.model('File', fileSchema);

// Routes
// Doctors
app.get("/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    console.error("❌ Error fetching doctors:", error);
    res.status(500).send({ error: "Something went wrong." });
  }
});

// Appointments
app.post("/appointments", async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify token
        req.userId = decoded.userId;
        const { userId } = req;
    const {  doctorId, date, time, email } = req.body;

    // Validate userId and doctorId
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(doctorId)) {
      return res.status(400).send("Invalid user or doctor ID format.");
    }

    const appointment = new Appointment({ userId, doctorId, date, time });
    await appointment.save();

    const appointmentDateTime = new Date(`${date}T${time}`);
    const reminderTime = new Date(appointmentDateTime.getTime() - 2 * 60 * 60 * 1000);
    const delay = reminderTime.getTime() - Date.now();

    const sendReminder = async () => {
      try {
        
        const user = await User.findById(userId);
        const doctor = await Doctor.findById(doctorId);

        if (!user || !doctor) {
          console.error("❌ User or Doctor not found", { userId, doctorId });
          return;
        }

        const aiResponse = await axios.post("http://localhost:5000/generate-email", {
          userName: user.name,
          doctorName: doctor.name,
          time,
        });

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Appointment Reminder",
          text: aiResponse.data.message,
        });

        console.log(`📧 Reminder sent to ${user.email} for Dr. ${doctor.name}`);
      } catch (error) {
        console.error("❌ Error sending reminder:", error);
      }
    };

    if (delay > 0) {
      setTimeout(sendReminder, delay);
    } else {
      console.log("⚠️ Reminder time already passed. Sending immediately for testing...");
      await sendReminder();
    }

    res.send({ message: "Appointment created & reminder scheduled!" });
  } catch (error) {
    console.error("❌ Error scheduling appointment:", error);
    res.status(500).send({ error: "Something went wrong." });
  }
});

app.get("/appointments/:userId", async (req, res) => {
  const { userId } = req.params;

  // Check if userId is valid
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send("Invalid user ID format.");
  }

  try {
    const appointments = await Appointment.find({ userId });
    res.json(appointments);
  } catch (error) {
    console.error("❌ Error fetching appointments:", error);
    res.status(500).send({ error: "Something went wrong." });
  }
});

// Seed Routes
app.post("/seed-doctors", async (req, res) => {
  try {
    await Doctor.insertMany([
      { name: "Dr. Asha Mehta", specialization: "Gynecologist", location: "Bangalore", lat: 12.9716, lng: 77.5946 },
      { name: "Dr. Rajesh Iyer", specialization: "Cardiologist", location: "Chennai", lat: 13.0827, lng: 80.2707 },
    ]);
    res.send("✅ Doctors seeded");
  } catch (error) {
    console.error("❌ Error seeding doctors:", error);
    res.status(500).send({ error: "Failed to seed doctors." });
  }
});

app.post("/seed-user", async (req, res) => {
  try {
    const newUser = await User.create({
      name: "Yashas Nagraj",
      email: "yashas@example.com",
      location: "Bangalore",
    });
    res.send(newUser);
  } catch (error) {
    console.error("❌ Error seeding user:", error);
    res.status(500).send({ error: "Failed to seed user." });
  }
});

// Medication Routes
app.get("/medications", async (req, res) => {
  try {
    const meds = await Medication.find();
    res.json(meds);
  } catch (error) {
    console.error("❌ Error fetching medications:", error);
    res.status(500).send({ error: "Something went wrong." });
  }
});

app.post("/medications", async (req, res) => {
  try {
    const med = new Medication(req.body);
    await med.save();
    res.json(med);
  } catch (error) {
    console.error("❌ Error adding medication:", error);
    res.status(500).send({ error: "Something went wrong." });
  }
});

app.delete("/medications/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Medication.findByIdAndDelete(id);
    res.status(200).send({ message: "Deleted" });
  } catch (err) {
    console.error("❌ Error deleting medication:", err);
    res.status(500).send({ error: "Failed to delete medication." });
  }
});

app.patch("/medications/:id/take", async (req, res) => {
  try {
    await Medication.findByIdAndUpdate(req.params.id, { taken: true });
    res.sendStatus(200);
  } catch (error) {
    console.error("❌ Error marking medication as taken:", error);
    res.status(500).send({ error: "Failed to update medication." });
  }
});

// Chat Proxy to Flask
app.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await axios.post("http://127.0.0.1:5000/chat", { prompt });
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Email Generation Endpoint
app.post("/generate-email", (req, res) => {
  const { userName, doctorName, time } = req.body;

  const message = `Dear ${userName},\n\nThis is a reminder for your appointment with ${doctorName} at ${time}.\n\nPlease arrive 15 minutes before your scheduled time.\n\nBest regards,\nYour Healthcare Team`;

  res.json({ message });
});

const upload = multer({ dest: "uploads/" });

app.post("/analyze", upload.single("file"), async (req, res) => {
  const file = req.file;

  const form = new FormData();
  form.append("file", fs.createReadStream(file.path), file.originalname);

  try {
    const response = await axios.post("http://localhost:5000/analyze", form, {
      headers: form.getHeaders(),
    });

    res.json(response.data);
  } catch (err) {
    console.error("Error during AI analysis:", err.message);
    res.status(500).send("AI Analysis Failed");
  }
});

app.post('/upload', async (req, res) => {
  const { cid, fileName, aesKey, iv, patientId } = req.body;
  const existing = await File.findOne({ cid });
  if (existing) return res.status(409).json({ message: 'File already exists' });
  await File.create({ cid, fileName, aesKey, iv, patientId, allowedDoctors: [] });
  res.status(201).json({ message: 'Metadata saved' });
});

app.post('/share', async (req, res) => {
  const { cid, doctorId } = req.body;
  const file = await File.findOne({ cid });
  if (!file) return res.status(404).json({ message: 'File not found' });
  if (!file.allowedDoctors.includes(doctorId)) {
    file.allowedDoctors.push(doctorId);
    await file.save();
  }
  res.json({ message: 'Doctor added to access list' });
});

app.get('/file/:cid', async (req, res) => {
  const { cid } = req.params;
  const { doctorId } = req.query;
  const file = await File.findOne({ cid });
  if (!file) return res.status(404).json({ message: 'Not found' });
  if (!file.allowedDoctors.includes(doctorId)) return res.status(403).json({ message: 'Access denied' });
  res.json({ fileName: file.fileName, aesKey: file.aesKey, iv: file.iv });
});

// MongoDB Connection
mongoose.connect(process.env.MONGO)
.then(() => {
    console.log('✅ Connected to MongoDB');
    // Start server after successful database connection
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
})
.catch((error) => {
    console.error('❌ MongoDB connection error:', error);
});
