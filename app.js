// Express
const express = require('express');
const app = express();

//Dotnet && Async errors
require('dotenv').config();
require('express-async-errors');

//Extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

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
app.set('trust proxy', 1)
app.use(rateLimiter({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
}))
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// Routes
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