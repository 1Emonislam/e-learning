require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes')
const courseRoutes = require('./routes/courseRoutes')
const purchasedRoutes = require('./routes/purchasedRoutes')
const { errorLog, errorHandlerNotify } = require('express-error-handle')
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "2gb", extended: true, parameterLimit: 50000 }));
app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(cors())
const serverApp = http.createServer(app);
//db connected
connectDB()
app.use('/users', userRoutes);
app.use('/course', courseRoutes)
app.use('/purchased', purchasedRoutes)
serverApp.listen(PORT, () => {
    console.log('Sever Started on PORT', PORT)
})
app.use([errorLog, errorHandlerNotify])