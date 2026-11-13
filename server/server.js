import dotenv from "dotenv"
import express from "express"
import cors from "cors";
import cafeRoutes from "./routes/cafes.js";
import userRoutes from "./routes/user.js";
import authRoute from "./routes/auth.js"
import errorHandler from './middleware/errorHandler.js';
import 'dotenv/config';
import authenticate from "./middleware/authenticate.js";
import requireRole from "./middleware/requireRole.js";

dotenv.config();
const app = express();

// middleware
app.use(cors({origin: process.env.CLIENT_URL,credentials: true}));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API Running TEST");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});


// Admin routes
app.use("/admin",authenticate,requireRole("ADMIN"));// mọi route bên dưới có /admin này cần signIn+role("ADMIN")
app.use("/api/admin/cafes", cafeRoutes);
app.use("/api/admin/users", userRoutes); 

// Public routes
app.use("/cafes",cafeRoutes)

// Authentication route
app.use("/api/auth", authRoute)

// Error handler
app.use(errorHandler);