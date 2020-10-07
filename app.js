const express = require('express');
const mongoose = require('mongoose');
const usersRoute = require('./routes/users.route');
const authRoute = require('./routes/auth.route');

const app = express();


mongoose.connect('mongodb://localhost:27017/exp-auth', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true

    }).then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.err('Could not connect to MongoDB...'));


app.use(express.json());
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);

app.get('/', async(req, res) => {

    return res.send('Hello Node!');
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log("Listening on http://localhost:" + port);

});