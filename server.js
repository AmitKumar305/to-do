require('dotenv').config();
const express = require('express');
const cors = require('cors');
const busboyBodyParser = require('busboy-body-parser');
const UserRoutes = require('./routes/user.routes');
const TodoRoutes = require('./routes/todo.routes');
const app = express();
require('./db/index');

app.use(express.json());
app.use(busboyBodyParser());
app.use(cors({
	origin: '*',
	methods: ['GET', 'POST'],
	allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-HTTP-Method-Override', 'Accept'],
	credentials: true,
}));

const PORT = process.env.PORT || 3000;

app.use('/api/user', UserRoutes);
app.use('/api/todo', TodoRoutes);

app.get('/', (req, res) => {
    res.send('<h1>Backend is running</h1>');
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
