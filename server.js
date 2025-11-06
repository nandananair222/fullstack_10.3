require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/index');

const app = express();
app.use(cors());
app.use(express.json());

// connect
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> console.log('mongo ok'))
.catch(err => console.error('mongo err', err));

app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server ${PORT}`));
