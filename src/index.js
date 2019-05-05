const port = process.env.PORT

const multer = require('multer')
require('./db/mongoose');

const express = require('express');
const app = express();

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

app.listen(port, () => {
    console.log(`server running at ${port}...`)
})