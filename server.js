require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const attractionRoutes = require('./routes/attractionRoutes');
const visitorRoutes = require('./routes/visitorRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/attractions', attractionRoutes);
app.use('/api/visitors', visitorRoutes);
app.use('/api/reviews', reviewRoutes);



// Add this to the existing server.js, before the app.listen()

const { handleError } = require('./utils/errorHandler');

// Error handling middleware
app.use(handleError);

// Handle unhandled routes
app.all('*', (req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Can't find ${req.originalUrl} on this server!`
    });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', ()=>{
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
