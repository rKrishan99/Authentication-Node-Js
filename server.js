require('dotenv').config();
const express = require('express');
const connectToDB = require("./database/db");
const authRoutes = require('./routes/auth-routes');

// Connect to MongoDB
connectToDB();

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});

