// Express
const express = require('express');
const app = express();

//Dotnet && Async errors
require('dotenv').config();
require('express-async-errors');

// DB module
const connectDB = require('./db/connect'); 

// not found and errorHandler Middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler')

//Routers
const authRouter = require('./routes/auth');
const  jobsRouter = require('./routes/jobs');

//Auth
const auth = require('./middleware/authentication')

//Middleware
app.use(express.json())



// Routes
app.get('/', (req, res)=>{
  res.send('Jobs API')
})
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', auth, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


// Server Port
const port = process.env.PORT || 3000;

// Start server after successful DB connection
const start = async()=>{
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is Listening on Port ${port}...`))
  } catch (error) {
    console.log(error)
  }  
}
start();