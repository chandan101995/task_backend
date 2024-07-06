import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import router from './router/routes.js';
dotenv.config();

const app = express();

//Initialize the express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', router);
   
const port = process.env.PORT || 5050;

//Initialize the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// 404 page not found error handling  middleware
app.use("*", function (req, res) {
    res
        .status(404)
        .json({ status: false, message: "Api endpoint does not found!" });
});

// global error handling middleware
app.use((err, req, res, next) => {
    // res.setHeader('Access-Control-Allow-Origin', '*');
    const status = err.status || 500;
    const message = err.message || "Server side error";
    const data = err.data || null;
    res.status(status).json({
        type: "error",
        message,
        data,
    });
});