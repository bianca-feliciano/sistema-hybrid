const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const itensRoutes = require('./routes/itensRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/itens', itensRoutes);

module.exports = app;