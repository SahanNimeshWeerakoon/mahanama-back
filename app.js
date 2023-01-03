require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const authRoutes = require('./routes/authRoutes');

const hostname = "0.0.0.0";
const port = process.env.port || 5000;
const app = express();
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

app.use(express.json());
app.use(cors());
app.use('/api', routes);
app.use('/api/vehicle', vehicleRoutes);
app.use('/api/auth', authRoutes);

database.on('error', (error) => console.log(error));
database.once('connected', () => console.log('Database Connected'));
app.listen(port, hostname, () => console.log(`Server Started at ${5000}`));