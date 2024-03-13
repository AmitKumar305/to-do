require('dotenv').config();
const express = require('express');
const cors = require('cors');
const busboyBodyParser = require('busboy-body-parser');
const UserRoutes = require('./routes/user.routes');
const app = express();
require('./db/index');

app.use(express.json());
app.use(busboyBodyParser());
app.use(cors({
    origin: '*',
}));

const PORT = process.env.PORT || 3000;

app.use('/api/user', UserRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});