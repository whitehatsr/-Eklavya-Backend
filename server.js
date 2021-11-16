import path from 'path'
import express from 'express'
import connectDB from './config/db.js'
import globalErrorHandler from './controllers/errorController.js'
import authRoutes from './routes/authRoutes.js'
import mentorRoutes from './routes/mentorRoutes.js'
import requestRoutes from './routes/requestRoutes.js'
import menteeRoutes from './routes/menteeRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import mongoSanitize from 'express-mongo-sanitize'
import helmet from 'helmet'
import xss from 'xss-clean'
import rateLimit from 'express-rate-limit'
import hpp from 'hpp'
import cors from 'cors'
import "dotenv/config" 

connectDB()

const app = express()

// Body Parser
app.use(express.json())

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

app.use('/api/auth',authRoutes)
app.use('/api',mentorRoutes)
app.use('/api',requestRoutes)
app.use('/api',menteeRoutes)
app.use('/api',messageRoutes)

const __dirname = path.resolve()

app.get('*', (req, res) =>
    res.status(404).send()
)

app.use(globalErrorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)
