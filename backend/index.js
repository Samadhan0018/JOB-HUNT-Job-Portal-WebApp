import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true,
};

app.use(cors(corsOptions));

// Application Routes
app.use("/api/v1/user", userRoute); // Corrected route path
app.use("/api/v1/company",companyRoute ); // Corrected route path
app.use("/api/v1/job",jobRoute ); // Corrected route path
app.use("/api/v1/application",applicationRoute ); // Corrected route path

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, async () => {
    try {
        await connectDB(); // Ensure DB connection happens before starting server
        console.log(`Server is running at port ${PORT}`);
    } catch (error) {
        console.error("Failed to connect to the database", error);
        process.exit(1); // Exit process if DB connection fails
    }
});
