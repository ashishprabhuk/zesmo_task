const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error(err));


app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));